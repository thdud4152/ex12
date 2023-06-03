import moment from 'moment'
import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, addDoc, collection } from 'firebase/firestore'

const PostWrite = ({history}) => {
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        title: '리액트란?',
        body: '프론트페이지를 작성하는 언어입니다.',
        date: ''
    });
    const { email, title, body, date } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const onSubmit =  async(e) => {
        e.preventDefault();
        if (title === '' || body === '') {
            alert('제목 또는 내용을 입력하세요');
        } else {
            //firebase에 저장
            if (window.confirm('저장하실래요?')) {
            await addDoc(collection(db, 'posts'), {
                ...form,
                    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                });
            history.push('/posts');
        }
    }

}

return (
    <Row>
        <Col>
            <h1 className='text-center mb-5'>글쓰기</h1>
            <Form onSubmit={onSubmit}>
                <Form.Control name="title" value={title}
                    onChange={onChange}
                    className='my-2'
                    placeholder='제목을 입력하세요.' />
                <Form.Control name="body" value={body}
                    onChange={onChange}
                    placeholder='내용을 입력하세요'
                    className='my-2'
                    as="textarea" row={10} />
                <div className='text-center'>
                    <Button type="submit"
                        className='mx-2'>글저장</Button>
                    <Button type="reset"
                        className='mx-2'
                        variant='secondary'>취소</Button>
                </div>

            </Form>
        </Col>
    </Row>
)
}

export default PostWrite