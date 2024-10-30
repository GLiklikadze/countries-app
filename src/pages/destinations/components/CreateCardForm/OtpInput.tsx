import {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import styles from "./OtpInput.module.css";

interface OtpInputProps {
  otpInputNum: number;
}

export interface OtpInputRef {
  inputRefs: React.MutableRefObject<{ [key: number]: HTMLInputElement | null }>;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(
  ({ otpInputNum }, ref) => {
    const generateRandomId = () => {
      const timestamp = Date.now();
      const randomNum = Math.random();
      return `id-${timestamp}-${randomNum}`;
    };
    const otpArray = useMemo(
      () =>
        Array.from({ length: otpInputNum }, () => ({
          value: "",
          id: generateRandomId(),
        })),
      [otpInputNum],
    );
    const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

    useImperativeHandle(ref, () => {
      return {
        inputRefs: inputRefs,
      };
    }, []);

    const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (event.target.value && index < otpArray.length - 1) {
        inputRefs?.current[index + 1]?.focus();
      }
      if (event.target.value && index === otpArray.length - 1) {
        inputRefs?.current[index]?.blur();
      }
    };
    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (
        event.key === "Backspace" &&
        index > 0 &&
        !event.currentTarget.value
      ) {
        inputRefs?.current[index - 1]?.focus();
      }
      if (
        !/[0-9]/.test(event.key) &&
        event.key !== "Backspace" &&
        event.currentTarget.value.length >= 1
      ) {
        event.preventDefault();
      }
    };
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pastedData = event.clipboardData.getData("text");
      if (!/^\d+$/.test(pastedData)) {
        return;
      }
      pastedData
        .slice(0, otpArray.length)
        .split("")
        .forEach((char: string, index: number) => {
          if (inputRefs.current[index]) {
            inputRefs.current[index].value = char;
          }
        });
      const lastFilledIndex = Math.min(pastedData.length, otpArray.length) - 1;
      inputRefs.current[lastFilledIndex]?.focus();
    };

    return (
      <div className={styles.otp_container}>
        {otpArray.map((input, index) => {
          return (
            <input
              ref={(inputElementReference) => {
                inputRefs.current[index] = inputElementReference;
              }}
              type="text"
              key={input.id}
              onChange={(event) => {
                handleChange(event, index);
              }}
              onPaste={handlePaste}
              maxLength={1}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={styles.otp_input}
              placeholder="-"
            />
          );
        })}
      </div>
    );
  },
);

export default OtpInput;
