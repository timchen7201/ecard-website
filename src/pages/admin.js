import { Button } from 'react-bootstrap'
import React, {useState} from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import axios from 'axios'
import {registerByXlsx} from '../api/gift'

export default function Admin(){
    const [xlsxFile,setXlsxFile] = useState([])
    const handleXlsxChange = ({ meta, file }, status) => { 
        console.log("cfile",file)
        if(status==="removed"){
            
            setXlsxFile([])
        }
        if(status==="preparing"){
            setXlsxFile(file)
        }
     }

    const handleSubmit=(e)=>{
        const xlsxData = new FormData();
        if(xlsxFile!==null && typeof(xlsxFile)!==null){
            xlsxData.append('xlsx',xlsxFile)
            console.log("-------")
            registerByXlsx(xlsxData).then((r)=>{
                if(r.length===0){
                    alert('something wrong')
                }else{
                    window.location.reload()
                }
            })

        }
    }
    return(
        <div className="container">
            <div className="">
            <Dropzone
                       // getUploadParams={getUploadParams}
                       onChangeStatus={handleXlsxChange}
                       // onSubmit={handleSubmit}
                       inputContent={<span>點擊上傳～</span>}
                       submitButtonContent={<span>上傳</span>}
                       maxFiles={1}
                       inputWithFilesContent={<span>增加檔案</span>}
                       accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                   /> 
            </div> 
             <div className="mt-3">
                <Button
                    onClick={handleSubmit}
                >上傳
                </Button>
             </div>
        </div>
    )
}

