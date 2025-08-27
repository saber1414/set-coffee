import React from "react";
import styles from "./dataTable.module.css";

type DataTableProps = {
  title: string;
  comments: string[];
};

const DataTable = ({ title, comments }: DataTableProps) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>تاریخ</th>
              <th>محصول</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>s</td>
              <td></td>
              <td>
                <button type="button" className={styles.no_check}>
                  در انتظار
                </button>
              </td>
              <td>
                <button type="button" className={styles.btn}>
                  مشاهده
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
