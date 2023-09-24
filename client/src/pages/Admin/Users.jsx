import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { updateProductStatus } from "../../apicalls/products";
import moment from 'moment';
import { getAllUsers, updateUserStatus } from "../../apicalls/users";
const Users = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getAllUsers();
            if (response.success) {
                dispatch(setLoader(false));
                message.success(response.message);
                setUsers(response.data)

            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);

        }
    }

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(setLoader(true));
            const response = await updateUserStatus(id, status);
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();


            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);

        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "username",
        },

        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (text, record) => {
                return record.role.toUpperCase()
            }
        },

        {
            title: "Created On",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(record.createdAt).format('MMMM Do YYYY, h:mm:ss a')
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase()
            }
        },
        {
            title: "Action",
            render: (text, record) => {

                const { status, _id } = record
                return (<div className="flex gap-5">
                    {status === 'active' && (
                        <span
                            className="underline cursor-pointer"
                            onClick={() => onStatusUpdate(_id, "blocked")}
                        > Block
                        </span>
                    )}

                    {status === 'blocked' && (
                        <span
                            className="underline cursor-pointer"
                            onClick={() => onStatusUpdate(_id, "active")}
                        > Unblock
                        </span>
                    )}

                   
                </div>)

            }
        },

    ];






    useEffect(() => {
        getData();
    }, [])

    return (
        <div >


            <Table columns={columns} dataSource={users} />


        </div>
    );
};


export default Users;
