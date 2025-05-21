const pickerOpts = {
    types: [
        {
            description: "Images",
            accept: {
                "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
}



export async function getFile() {
    let results = await window.showOpenFilePicker(pickerOpts)
    if(results){
        return results[0].name
    }else{
        return false
    }
}