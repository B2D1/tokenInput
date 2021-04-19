import "./index.css";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface ITokenInput {
  tokenSeparators?: string[];
  value?: string | string[];
  row?: number;
  tokenLength?: number;
  autoFocus?: boolean;
  placeholder?: string;
  validator?: (token: string) => boolean;
  onChange?: (newVal: string[]) => void;
}

export interface IRef {
  empty(): void;
}

const TokenInput = forwardRef<IRef, ITokenInput>(
  (
    {
      tokenSeparators,
      value = [],
      row = 3,
      autoFocus = false,
      placeholder,
      tokenLength = 24,
      validator = () => true,
      onChange,
    },
    ref
  ) => {
    const INPUT_INIT_WIDTH = 4;
    const LINE_FEED = /\n/g;
    const SPACE = "\u00a0";
    const SEPARATOR_REG =
      tokenSeparators && new RegExp(`[${tokenSeparators.join("")}]`);

    const editRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);
    const [isFocus, setFocus] = useState(false);
    const [isComposing, setComposing] = useState(false);
    const [val, SetVal] = useState("");
    const [tokens, setTokens] = useState<string[]>(
      Array.isArray(value) ? value : [value]
    );

    useImperativeHandle(
      ref,
      () => ({
        empty: () => {
          tokens.length = 0;
        },
      }),
      [tokens]
    );

    const addTokens = (newToken: string | string[]) => {
      if (isComposing) return;

      SetVal("");

      const newTokens = Array.from(
        new Set([
          ...tokens,
          ...(Array.isArray(newToken) ? newToken : [newToken])
            .map((token) => token.replace(LINE_FEED, " "))
            .filter((token) => Boolean(token.trimStart().trimEnd())),
        ])
      );

      setTokens(newTokens);
      if (newTokens.length !== tokens.length) {
        onChange?.(newTokens);
      }
    };

    const removeToken = (index: number) => {
      if (!tokens.length) return;
      tokens.splice(index, 1);
      onChange?.(tokens);
      setTokens([...tokens]);
    };

    const calcInputWidth = (str: string) => {
      mirrorRef.current!.innerText = str;
      const width = getComputedStyle(mirrorRef.current!)["width"];
      return parseFloat(width.substring(0, width.length - 2));
    };

    const resetInputWidth = () => {
      // do not reset input width when edit area has content
      if (val) return;

      contentRef.current!.style.width = `${INPUT_INIT_WIDTH}px`;
      mirrorRef.current!.textContent = SPACE;
    };

    const scrollToBottom = () => {
      const con = containerRef.current!;
      con.scrollTop = con.scrollHeight - con.clientHeight;
    };

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = ev.target;

      SetVal(value);

      contentRef.current!.style.width = `${
        INPUT_INIT_WIDTH + calcInputWidth(value)
      }px`;

      if (tokenSeparators && SEPARATOR_REG!.test(value)) {
        addTokens(value.split(SEPARATOR_REG!));
      }
    };

    const handleKeyDown = (ev: React.KeyboardEvent) => {
      if (ev.key === "Enter") {
        addTokens(val);
      } else if (ev.key === "Backspace" && val.length === 0) {
        removeToken(tokens.length - 1);
      }
    };

    const handleCloseIconClick = (ev: React.MouseEvent, index: number) => {
      ev.nativeEvent.stopImmediatePropagation();
      ev.stopPropagation();

      removeToken(index);
      if (isFocus) editRef.current?.focus();
    };

    const handleCompositionStart = () => {
      setComposing(true);
    };
    const handleCompositionEnd = () => {
      setComposing(false);
    };

    const handleContainerBlur = () => setFocus(false);

    const handleFocus = () => setFocus(true);

    const handleContainerClick = (ev: React.MouseEvent) => {
      ev.nativeEvent.stopImmediatePropagation();

      const editEle = editRef.current;
      if (editEle) {
        editEle.selectionStart = editEle.selectionEnd = editEle.value.length;
      }

      editRef.current?.focus();
      scrollToBottom();
    };

    const handleInputClick = (ev: React.MouseEvent) => {
      ev.stopPropagation();
      ev.nativeEvent.stopImmediatePropagation();
    };

    useEffect(() => {
      resetInputWidth();
      scrollToBottom();
    }, [tokens]);

    useEffect(() => {
      scrollToBottom();
    }, [val]);

    useEffect(() => {
      document.addEventListener("click", handleContainerBlur);
      return () => document.removeEventListener("click", handleContainerBlur);
    }, [handleContainerBlur]);

    return (
      <div
        id="root-teamGuidance"
        ref={containerRef}
        className={`tokenInput__container ${
          isFocus ? "tokenInput__container--focus" : ""
        }`}
        style={{ maxHeight: row * 22 + 10 + (row - 1) * 9 }}
        onClick={handleContainerClick}
      >
        {tokens.map((token, index) => (
          <div
            onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
            className={`tokenInput__token ${
              !validator(token) ? "tokenInput__token--error" : ""
            }`}
            key={token}
          >
            {token.length > tokenLength ? (
              <span>{token.substring(0, tokenLength) + "..."}</span>
            ) : (
              <span>{token}</span>
            )}
            <svg
              onClick={(ev) => handleCloseIconClick(ev, index)}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.99993 5.29282L9.85868 1.43406C9.95632 1.33643 10.1146 1.33643 10.2122 1.43406L10.5658 1.78762C10.6634 1.88525 10.6634 2.04354 10.5658 2.14117L6.70703 5.99993L10.5658 9.85869C10.6634 9.95632 10.6634 10.1146 10.5658 10.2122L10.2122 10.5658C10.1146 10.6634 9.95632 10.6634 9.85868 10.5658L5.99993 6.70703L2.14117 10.5658C2.04354 10.6634 1.88525 10.6634 1.78762 10.5658L1.43406 10.2122C1.33643 10.1146 1.33643 9.95632 1.43406 9.85869L5.29282 5.99993L1.43406 2.14117C1.33643 2.04354 1.33643 1.88525 1.43406 1.78762L1.78762 1.43406C1.88525 1.33643 2.04354 1.33643 2.14117 1.43406L5.99993 5.29282Z" />
            </svg>
          </div>
        ))}
        <div className="tokenInput__content" ref={contentRef}>
          {val || tokens.length ? null : (
            <span className="tokenInput__content__placeholder">
              {placeholder}
            </span>
          )}
          <input
            autoFocus={autoFocus}
            ref={editRef}
            className={"tokenInput__content__edit"}
            type="text"
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onFocus={handleFocus}
            onClick={handleInputClick}
            value={val}
          ></input>
          <span ref={mirrorRef} className="tokenInput__content__mirror">
            &nbsp;
          </span>
        </div>
      </div>
    );
  }
);

export default TokenInput;
