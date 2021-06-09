//async function that updates the UI and then feeds it to the event listener
/* const updateUi = async () => {
    const req = await fetch ('http://localhost:9090/all');
    try{
        const allData = await req.json();
        console.log(allData);
        document.getElementById('content').innerHTML = `Aww, dont feel: ${allData.feelings}`;
        document.getElementById('date').innerHTML = `date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `${allData.temp} C`;
    } catch(error) {
        console.log('error', error);
    }
}
export { updatUi } */