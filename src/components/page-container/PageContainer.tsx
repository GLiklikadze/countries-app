import styles from "./PageContainer.module.css";

const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default PageContainer;
