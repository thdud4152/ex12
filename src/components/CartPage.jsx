import React, { useEffect, useState } from 'react'
import {Row, Col, Table, Button} from 'react-bootstrap'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { app } from '../firebaseInit'

const CartPage = () => {
    const uid=sessionStorage.getItem('uid');
    const db = getDatabase(app);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);


    const onRemove = (isbn) =>{
        if(window.confirm(isbn + '번 장바구니를 삭제하시겠습니까/?')){
            remove(ref(db, `cart/${uid}/${isbn}`));
            alert('장바구니삭제 완료!');
        }
    }

    const getBooks = () => {
        setLoading(true);
        onValue(ref(db, `cart/${uid}`), (snapshot) => {
            let rows = [];
            snapshot.forEach(row => {
                rows.push({ key: row.key, ...row.val() });
            });
            //console.log(rows);
            setBooks(rows);
            setLoading(false);
        });
    }

    useEffect(()=>{
        getBooks();
    }, []);

    if(loading) return <h1>로딩중...</h1>
  return (
    <Row className='my-5'>
        <Col>
            <h1 className='text-center'>장바구니</h1>
            <Table>
                <thead>
                    <tr>
                        <td>제목</td>
                        <td>가격</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                        <tr key={book.key}>
                            <td>{book.title}</td>
                            <td>{book.price}</td>
                            <td><Button className='btn-sm' variant='danger'
                                    onClick={()=>onRemove(book.isbn)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default CartPage