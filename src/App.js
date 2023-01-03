import logo from './logo.svg';
import './App.css';
import GridView from './components/gridView/GridView';
import { useState } from 'react';

function App() {

  const apiURL = 'https://localhost:7136/api'
  const urlAuthLogout = `${apiURL}/auth/logout`
  const urlClientGetList = `${apiURL}/client/get-list`
  const urlAuthRefresh = `${apiURL}/auth/refresh`

    let data = []
    const [filter, setFilterState] = useState({
        Name: '',
        Value: '',
        Type: ''
    })
    const [pageState, setPageState] = useState({
        isLoading: false,
        page: 1,
        pageSize: 2,
        rowsPerPage: [2, 4, 8]
    })
    const [dataState, setDataState] = useState({
        data: data,
        total: 0
    })

    const rowClick = ({ row }) => {
        console.log(row)
    }

    const loading = false

    const funtionResponseType = responseInit => {
        return responseInit.data.Clients
    }
    const columns = [
        {
            field: 'Name',
            headerName: 'Name',
            minWidth: 150,
            sortable: false,
            filterable: true,
            flex: 0.5
        },
        {
            field: 'Value',
            headerName: 'Value',
            flex: 0.5
        },
        {
            field: 'Type',
            headerName: 'Type',
            valueOptions: ['Client', 'Server'],
            sortable: false,
            filterable: false,
            flex: 0.5,
            minWidht: 100,
            valueGetter: params =>
                params.row.Type == 1
                    ? 'Client'
                    : 'Server'
        },
        {
            field: 'Url',
            headerName: 'Url',
            description: 'Url',
            filterable: false,
            sortable: false,
            flex: 1,
            minWidth: 300
        }
    ]
    const axiosConfig = {
      endPoints:{
          authLogout: urlAuthLogout,
          authRefresh: urlAuthRefresh
      },
      resources:{
          error: 'error resource',
          unauthorised: 'error unauthorised resource',
          noHaveAccess: 'error.noHaveAccess',
          badRequest: 'error.badRequest',
          uncontrolledError: 'error.uncontrolledError',
          connectionError: 'error.connectionError',
          timeout: 'error.timeout',
          timeoutMessage: 'error.timeoutMessage'
      },
      config: {
          method: 'get',
          url: urlClientGetList,
          data: {
              ...filter,
              Page: pageState.page,
              RecordsPerPage: pageState.pageSize
          }
      },
      onLoad: false
  }
  return (
    <div className="App">
                <GridView
                columns={columns}
                urlGetList={urlClientGetList}
                responseFunction={funtionResponseType}
                pageStateGrid={pageState}
                filterGrid={filter}
                dataStateGrid={dataState}
                onRowClick={rowClick}
                axiosConfig={axiosConfig}/>

    </div>
  );
}

export default App;
