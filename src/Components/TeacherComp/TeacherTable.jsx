import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import lecturerAvatar from '../../assets/lecturer.jpg';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteButtonPopUp from './DeleteButtonPopUp';
import TeacherDetaileditingDrawer from './TeacherDetaileditingDrawer';
const data = [
  {
    key: '1',
    fname: 'John Brown',
    lname:"wijenayaka",
    subject:"sinhala",
    email:"john@gamil.com",
    phoneNo:"0789696988",
    action:"new",
  },
  {
    key: '2',
    fname: 'Nisal thathsara',
    lname:"jayawardana",
    subject:"English",
    email:"Nisal@gamil.com",
    phoneNo:"0789645888",
    action: 'old',
  },
  {
    key: '3',
    fname: 'Pathum ',
    lname:"Chathuranga",
    subject:"Science",
    email:"pathum@gamil.com",
    phoneNo:"0744696988",
    action: 'new',
  },
  {
    key: '4',
    fname: 'Wikum',
    lname:"rasanjana",
    subject:"Maths",
    email:"wikum@gamil.com",
    phoneNo:"0789677988",
    action: 'Old',
  },
];


const TeacherTable = () => {
    const [opendeleteModel, setOpendeleteModel] = useState(false);
    const [openeditingDrawer,setOpeneditingDrawer]=useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const drawerConfigOpening=()=>{
        setOpeneditingDrawer(true);
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
      {
        title: 'First Name',
        dataIndex: 'fname',
        key: 'fname',
        width: '20%',
        ...getColumnSearchProps('fname'),
        sorter: (a, b) => a.fname.length - b.fname.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Last Name',
        dataIndex: 'lname',
        key: 'lname',
        width: '20%',
        ...getColumnSearchProps('lname'),
        sorter: (a, b) => a.lname.length - b.lname.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
        width:"10%",
        ...getColumnSearchProps('subject'),
        
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width:"30%",
        ...getColumnSearchProps('email'),
        
      },
      {
        title: 'Phone No',
        dataIndex: 'phoneNo',
        key: 'phoneno',
        ...getColumnSearchProps('phoneno'),
        
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (pic) => {
          return pic !== 'new' ? (
            <div className='border-2 border-red-400 w-full items-center justify-center'>
              <button className='mr-2 ' onClick={()=>drawerConfigOpening()}>
                <EditRoundedIcon  className='text-[20px] text-green-600 hover:bg-green-500 hover:rounded-xl hover:text-white scalar-card' />
              </button>
              <button className='text-[20px] text-red-600  ' onClick={()=>setOpendeleteModel(true)} >
                <DeleteOutlineRoundedIcon  className='text-[20px] scalar-card hover:bg-red-500 hover:text-white rounded-full' />
              </button>
            </div>
          ) : (
            <div className='border-2 border-red-400 w-full items-center justify-center'>
              <button className='bg-blue-700 text-white p-1 rounded-md hover:bg-blue-800' onClick={()=>drawerConfigOpening()}>
                <AddRoundedIcon className='text-[15px]' />add
              </button>
            </div>
          );
        }
      }
        // ...getColumnSearchProps('action'),

    ];
    return (
    <>
    <Table columns={columns} dataSource={data} />
    <DeleteButtonPopUp  opendeleteModel={opendeleteModel} setOpendeleteModel={setOpendeleteModel}/>
    <TeacherDetaileditingDrawer openeditingDrawer={openeditingDrawer} setOpeneditingDrawer={setOpeneditingDrawer}/>
    </>
    )
    ;
}

export default TeacherTable