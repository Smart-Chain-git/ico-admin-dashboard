var express    = require('express');  
const mysql2 = require('mysql2/promise');
const config = require('../config/config.js');

var router = express.Router();  

router.get('/getdata', async (req,res)=>{
        var [data1,data2,data3,data4,data5,data6] = await task();
        if(!data1 || !data2 || !data3 || !data4 || !data5 || !data6){
            res.json({msg:'error', d1:data1, d2:data2, d3:data3, d4:data4, d5:data5, d6:data6});
        }else{
            res.json({msg:'success', d1:data1, d2:data2, d3:data3, d4:data4, d5:data5, d6:data6});
        }
});


async function connectToDb() {
    const connection = await mysql2.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME
      }).catch(error => {console.log(error)});
    return connection;
}
function endDbConnection(connection_to_end)
{connection_to_end.end();}

async function getValidatedFunds(co) {
    const [rows, fields] = await co.execute('SELECT SUM(amount*price_dollar) AS total_amount FROM dxd_transactions t INNER JOIN dxd_smartlinkcopy k ON k.sender_addr = t.sender_addr INNER JOIN dxd_blockchain b ON b.tx_hash = t.tx_hash WHERE k.KYCStatus = "APPROVED";').catch(error => {console.log(error)});
    return rows;
}
async function getValidatedAndPendingFunds(co) {
    const [rows, fields] = await co.execute('SELECT SUM(amount*price_dollar) AS total_amount FROM dxd_transactions_unverified t INNER JOIN dxd_smartlinkcopy k ON k.sender_addr = t.sender_addr INNER JOIN dxd_blockchain_unverified b ON b.tx_hash = t.tx_hash WHERE k.KYCStatus = "APPROVED";').catch(error => {console.log(error)});
    return rows;
}
async function getAllFunds(co) {
    const [rows, fields] = await co.execute('SELECT SUM(amount*price_dollar) AS total_amount FROM dxd_blockchain_unverified;').catch(error => {console.log(error)});
    return rows;
}
async function getSMAKtotal(co) {
    const [rows, fields] = await co.execute('select sum(SMAK) AS SMAK from dxd_smartlinkcopy;').catch(error => {console.log(error)});
    return rows;
}
async function getSMAKpresale(co) {
    const [rows, fields] = await co.execute('select sum(SMAK_pre_sale) AS SMAK_pre_sale from dxd_smartlinkcopy;').catch(error => {console.log(error)});
    return rows;
}
async function getSMAKico(co) {
    const [rows, fields] = await co.execute('select sum(SMAK_ico) AS SMAK_ico from dxd_smartlinkcopy;').catch(error => {console.log(error)});
    return rows;
}

async function task() {
    const co = await connectToDb();
    const validatedFunds = await getValidatedFunds(co);
    const validatedAndPendingFunds = await getValidatedAndPendingFunds(co);
    const allFunds = await getAllFunds(co);
    const SMAKtotal = await getSMAKtotal(co);
    const SMAKpresale = await getSMAKpresale(co);
    const SMAKico = await getSMAKico(co);
    endDbConnection(co);
    return [validatedFunds[0].total_amount, validatedAndPendingFunds[0].total_amount, allFunds[0].total_amount, SMAKtotal[0].SMAK, SMAKpresale[0].SMAK_pre_sale, SMAKico[0].SMAK_ico];
}

module.exports = router;