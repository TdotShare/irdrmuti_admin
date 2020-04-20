import swal from 'sweetalert';
// import { actionError , actionSuccess , actionInfo }  from '../../../common/AlertFix'

const actionError = () => {
    swal("ทำรายการล้มเหลว", 'ฐานข้อมูลอาจเกิดข้อผิดพลาด หรือ สัญญาณอินเตอร์ไม่เสถียร กรุณาติดต่อเจ้าหน้าที่ดูแลระบบ' , "error")
}

const actionSuccess = (label) => {
    swal("ทำรายการสำเร็จ", label, "success")
}
const actionInfo = (label) => {
    swal("การทำรายการมีข้อผิดพลาด", label , "info")
}

export default { actionInfo , actionSuccess , actionError }
