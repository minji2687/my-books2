import { Link } from "react-router-dom";
import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { BookType } from "../types";
import moment from "moment";
import { Tooltip, Button } from "antd";
import styles from "./Books.module.css";

interface BookProps extends BookType {
  deleteBook: (bookId: number) => void;
}

const Book: React.FC<BookProps> = ({
  bookId,
  title,
  author,
  createdAt,
  url,
  deleteBook,
}) => {
  return (
    <div className={styles.book}>
      <div className={styles.title}>
        <Link to={`/book/${bookId}`} className={styles.link_detail_title}>
          <BookOutlined /> {title}
        </Link>
      </div>
      <div className={styles.author}>
        <Link to={`/book/${bookId}`} className={styles.link_detail_author}>
          {author}
        </Link>
      </div>
      <div className={styles.created}>
        {moment(createdAt).format("MM-DD-YYYY hh:mm a")}
      </div>
      <div className={styles.Tooltips}>
        <Tooltip title={url}>
          <a
            href={url}
            target="_BLANK"
            className={styles.link_url}
            rel="noreferrer"
          >
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<HomeOutlined />}
              className={styles.button_url}
            />
          </a>
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            className={styles.button_edit}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            size="small"
            type="primary"
            shape="circle"
            danger
            icon={<DeleteOutlined />}
            onClick={clickDelete}
            className={styles.button_delete}
          />
        </Tooltip>
      </div>
    </div>
  );
  function clickDelete() {
    deleteBook(bookId);
  }
};

export default Book;
