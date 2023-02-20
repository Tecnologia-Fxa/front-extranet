import * as XLSX from 'xlsx'

export const readFileXlsx = (e) =>{

    const target = e.target
    const name = target.name
    
    const filas = []
    if (name === 'file' && target.files[0]){
        let reader = new FileReader()
        reader.readAsArrayBuffer(target.files[0])
        reader.onloadend = i =>{
            let data = new Uint8Array(i.target.result)
            let workbook = XLSX.read(data, {type: 'array'})
            
            workbook.SheetNames.forEach((shetName)=>{
                let XL_row_objet = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[shetName])
                filas.push(...XL_row_objet)
            })

        }
    }
    console.log(filas)
    return filas

}