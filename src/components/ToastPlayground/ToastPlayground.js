import React from "react";

import Button from "../Button";

import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [option, setOption] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);
  function handleAddToast(message, option) {
    if (!message) {
      return;
    }

    const nextToast = [
      ...toasts,
      {
        message,
        variant: option,
        id: crypto.randomUUID(),
      },
    ];
    setToasts(nextToast);
  }
  function handleToastClose(id) {
    const nextToast = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToast);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf
        handleToastClose={handleToastClose}
        toasts={toasts}
      ></ToastShelf>

      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault();
          handleAddToast(message, option);
          setMessage("");
          setOption(VARIANT_OPTIONS[0]);
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((variant) => (
              <label key={variant} htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type='radio'
                  name='variant'
                  value={variant}
                  checked={option === variant}
                  onChange={(event) => {
                    setOption(event.target.value);
                  }}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
