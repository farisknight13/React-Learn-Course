import React from 'react'

const Sidebar = () => {
    // let fullname = 'faris'
    const [fullname, setFullname] = React.useState('faris')
    const [isShow, setIsshow] = React.useState(true)

    const changeName = () => {
        // fullname = 'knight'
        setFullname('knight')
        setIsshow(!isShow)
    }
    React.useEffect(() => {
        console.log('sidebar useEffect')
    })

    React.useEffect(() => {
        console.log('sidebar useEffect one time only')
    },[])

    React.useEffect(() => {
        console.log('sidebar useEffect fullname => ' + fullname)
    },[fullname])

    return (
        <>
            <h3>Sidebar component</h3>
            {isShow ? <p>Hello</p> : <p>World</p>}
            <p>
                Hello {fullname}
            </p>
            <button onClick={changeName} >Change Name</button>
        </>
    )
}

export default Sidebar
