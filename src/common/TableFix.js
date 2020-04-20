import React from 'react'
import MaterialTable from "material-table";

export default function TableFix(props) {

    let data = props.data ? props.data : []
    let field = props.field ? props.field : []
    let dataColumns = []

    // const GetField = () => {
    //     let setData = []
    //     field.forEach((el, index) => {
    //         if (index === 0) setData.push({ title: '#', render: event => event.tableData.id + 1 })
    //         setData.push({ title: el.title, field: el.field , hidden : el.hidden ? el.hidden : false })
    //     });
    //     return setData ? setData : []   
    // }

    // dataColumns = GetField() 

    const GetField = () => {
        let setData = []
        field.forEach((el, index) => {
            if (index === 0) setData.push({ title: '#', render: event => event.tableData.id + 1 })
            if(el.render){
                setData.push({ title: el.title, field: el.field , hidden : el.hidden ? el.hidden : false , render : el.render })
            }else{
                setData.push({ title: el.title, field: el.field , hidden : el.hidden ? el.hidden : false })
            }
        });
        return setData ? setData : []   
    }

    dataColumns = GetField() 

    return (
        <div style={{ maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
            <MaterialTable
               
                title={props.title ? props.title : null}
                columns={dataColumns}
                data={data}
                actions={props.grantActions}
                options={
                    {
                        pageSizeOptions: [5],
                        columnsButton: true,
                        selection: props.selection ? props.selection : false
                    }
                }
                localization={{
                    header: {
                        actions: ''
                    },
                }}
                onSelectionChange={props.onSelectionChange}
            />
        </div>
    )
}
