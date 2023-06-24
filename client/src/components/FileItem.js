import React, { useState, useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Collapse, Button } from 'reactstrap';
import { setCurrentPath } from '../store/fileManagerSlice';
import { createUseStyles } from 'react-jss';
import { useDrop, useDrag } from 'react-dnd'
import 'boxicons'
import { moveFile, deleteFile } from '../store/fileManagerSlice'

const useStyles = createUseStyles({
    fileName: {
        display: 'flex'
    },
    folder: {
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            height: '100%',
            border: '1px dotted',
            left: '7px',
            bottom: '0',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '13px',
            border: '1px dotted',
            left: '-13px',
            top: '10px',
        }
    },
    item: {
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '13px',
            border: '1px dotted',
            left: '-13px',
            top: '10px',
        }
    },
    icon: {
        position: 'relative',
        marginRight: '10px',
        background: '#fff',
        zIndex: 999
    },
    fileActionBtnWrap: {
        marginLeft: '20px'
    },
    fileActionBtn: {
        '& .btn.btn-secondary': {
            background: 'none !important',
            border: 0,
            padding: 0,
        }
    },

})

const FileAction = (({ file }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const deleteHandler = (path) => {
        dispatch(deleteFile(path))
    }
    return <>
        <div className={classes.fileActionBtnWrap}>
            <Button
                onClick={(e) => {
                    e.preventDefault()
                }}
                style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                }}><box-icon name='move' size='16px'></box-icon></Button>
            <Button
                onClick={(e) => {
                    e.preventDefault()
                    deleteHandler(file.path)
                }}
                style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                }} className={classes.FileActionBtn}><box-icon name='trash-alt' size='16px' color="#ff2424"></box-icon></Button>
        </div >
    </>
})

export const FileItem = function FileItem({
    data,
}) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false);
    const [fromPath, setRefFrom] = useState(null);
    const [movePath, setRefMovedTo] = useState(null);


    const handleDrop = useCallback(
        (item, monitor) => {
            // const { name } = item
            console.log('handleDrop item', item)
            console.log('handleDrop monitor', movePath)
            dispatch(moveFile(item?.draggedComponent, movePath))
        },
        [movePath],
    )
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: 'file',
            item: {
                draggedComponent: fromPath
            },
            collect: (monitor) => {
                // console.log(monitor.getItem(),'getItem')
                return {
                    opacity: monitor.isDragging() ? 0.4 : 1,
                }
            },
            // collect: (monitor) => ({
            //     opacity: monitor.isDragging() ? 0.4 : 1,
            // }),
        }),
        [fromPath],
    )
    const [{ isOver, canDrop }, drop] = useDrop({
        // drop: onDrop,
        accept: 'file',
        drop: handleDrop,
        collect: (monitor) => {
            // console.log(monitor.getItem(), 'getItem from Drop')
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    })


    return (
        <>
            <div style={{ paddingLeft: '20px' }}>
                {data?.map((file) => {
                    return (
                        <div
                            className={file.isDirectory ? classes.folder : classes.item}
                            key={file.name}
                        >
                            <div>
                                <div
                                    // ref={file.isDirectory ? drop : drag}
                                    ref={(div) => {
                                        if (file.isDirectory) {
                                            drop(div)
                                            setRefMovedTo(file.path)
                                        } else {
                                            drag(div)
                                            setRefFrom(file.path)
                                        }
                                    }}
                                    style={{ opacity }}
                                    className={classes.fileName}
                                    path={file.path}
                                >
                                    <span
                                        className={classes.icon}
                                        onClick={() => {
                                            if (file.isDirectory) {
                                                setIsOpen(!isOpen)
                                                dispatch(setCurrentPath(file.path.replace(/\//gi, ' > ')))
                                            }
                                            // file.isDirectory ? toggle(file.path) : null
                                        }}
                                    >
                                        {file.isDirectory ?
                                            !isOpen ?
                                                <box-icon name='folder' ></box-icon> :
                                                <box-icon name='folder-open' ></box-icon>
                                            : <box-icon name='file' ></box-icon>}
                                    </span>
                                    <span>
                                        {file.name}
                                    </span>
                                    {!file.isDirectory && <FileAction file={file} />}
                                </div>
                            </div>
                            {file.files &&
                                <Collapse isOpen={isOpen} >
                                    <FileItem data={file.files} />
                                </Collapse>
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}

