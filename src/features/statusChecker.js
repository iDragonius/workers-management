import { h } from 'gridjs'

export default  (data) =>{
    let status;
    if(data.status===1){
        status=  h(
            'p',
            {
                className:
                    'text-orange-400 font-semibold',

            },
            'Pending'
        )
    } else if(data.status===2){
        status=  h(
            'p',
            {
                className:
                    'text-green-600 font-semibold',

            },
            'Accepted'
        )
    } else {
        status=  h(
            'p',
            {
                className:
                    'text-red-600 font-semibold',

            },
            'Rejected'
        )
    }

    return status
}