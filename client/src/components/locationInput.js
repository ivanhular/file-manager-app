import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Input,
    ButtonGroup,
    Button,
    Row,
    Col
} from 'reactstrap'
import { createUseStyles } from 'react-jss'
import { setModalAction } from '../store/fileManagerSlice'

const useStyles = createUseStyles({
    btnWrap: {
        '& button': {
            width: '50%',
            borderRadius: 0
        }
    },
})

const LocationInput = ({ toggle }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const currentPath = useSelector((state) => state.fileManager.currentPath)
    return <>
        <Row>
            <Col xs={12} md={8}>
                <Input disabled placeholder='Location:' value={currentPath} />
            </Col>
            <Col xs={12} md={4} className={classes.btnWrap}>
                <Button
                    onClick={(e) => {
                        toggle()
                        dispatch(setModalAction('location'))
                    }}
                    color='primary'
                >
                    Add Location
                </Button>
                <Button
                    onClick={(e) => {
                        toggle()
                        dispatch(setModalAction('book'))
                    }}
                    color='secondary'
                >
                    Add Book
                </Button>
            </Col>
        </Row>

    </>
}

export default LocationInput