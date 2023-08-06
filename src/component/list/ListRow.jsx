import styles from "./ListRow.module.css";

const ListCell = ({ children , clickedData  }) => {

  return <tr className={styles.cell} onClick={clickedData} >{children}</tr>;
 
};

export default ListCell;
