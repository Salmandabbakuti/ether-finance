function log(message) {
   document.getElementById("log").innerHTML=message;
    console.log(message);
     }
  function error(message) {
   document.getElementById("log").innerHTML=message.message;
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
function getMyLoans() {
    finance.getMyLoansLength((err, maxLoans) => {
        let sectionsContent = `<table>
   <tr>
   <th>S.No</th>
   <th>Loan Id</th>
   <th>Financer</th>
   <th>Loan Amount</th>
   <th>Repayment Period</th>
   </tr>`
        maxLoans = maxLoans.toNumber()
        for(let i = 0; i < maxLoans; i++) {
            finance.getMyLoans(i, (err, loanData) => {
                sectionsContent += `<tr>
                <td>${i+1}</td>
                 <td>${loanData[0]}</td>
                    <td>${loanData[1]}</td>
                    <td>${(loanData[2])/1000000000000000000} ETH</td>
                     <td>${(loanData[3]/2629746)} Months</td>
                </tr>`

                if(i === maxLoans - 1) document.querySelector('#resp').innerHTML = sectionsContent;
            })
            let content = sectionsContent+ `</table>`;
    document.querySelector('#resp').innerHTML = content;

        }

    })

}
function getRequests() {
    finance.getRequestsLength((err, maxRequests) => {
        let sectionsContent =`<table>
   <tr>
   <th>S.No</th>
   <th>Loan Id</th>
   <th>Requester</th>
   <th>Loan Amount</th>
   <th>Contact Address</th>
   </tr>`
        maxRequests = maxRequests.toNumber()
        for(let i = 0; i < maxRequests; i++) {
            finance.getRequests(i, (err, loanData) => {
                sectionsContent += `<tr>
                      <td>${i+1}</td>
                    <td>${loanData[0]}</td>
                    <td>${loanData[1]}</td>
                    <td>${loanData[2]/1000000000000000000} ETH</td>
                     <td>${loanData[3]}</td>
                <tr>`

                if(i === maxRequests - 1) document.querySelector('#resp').innerHTML = sectionsContent
            })
     let content = sectionsContent+ `</table>`;
    document.querySelector('#resp').innerHTML = content;

        }

    })
}
function getAllLenders() {
    finance.getAllLendersLength((err, maxLenders) => {
        let sectionsContent =  `<table>
   <tr>
   <th>S.No</th>
   <th>Financer Address</th>
   <th>Name</th>
   <th>Contact</th>
   <th>Mobile</th>
   <th>PoolCapacity</th>
   </tr>`
        maxLenders = maxLenders.toNumber()
        for(let i = 0; i < maxLenders; i++) {
            finance.allLenders(i, (err, lenderData) => {
                sectionsContent += `<tr>
                    <td>${i+1}</td>
                    <td>${lenderData[0]}</td>
                    <td>${lenderData[1]}</td>
                    <td>${lenderData[4]}</div>
                     <td>${lenderData[5]}</td>
                     <td>${lenderData[6]} ETH</td>
                
                 </tr>`

                if(i === maxLenders - 1) document.querySelector('#resp').innerHTML = sectionsContent;
            })
            let content = sectionsContent+ `</table>`;
             document.querySelector('#resp').innerHTML = content;

        }

    })
}
function getLoanDetails() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    finance.loanDetails(document.getElementById("getLoanId").value, (err, loanData) => {
        if(err) return alert(err)
 let profileContent = ''
        let loanId = loanData[0]
        let requesterAddress = loanData[1]
        let requesterName = loanData[2]
        let requesterMobile = loanData[3]
        let requesterPermanentAddress = loanData[4]
        let lenderAddress = loanData[5]
        let loanAmount = loanData[6]
        
        profileContent += `
   <table>
   <tr>
   <th>Loan Id</th>
   <th>Requester Address</th>
   <th>Name</th>
   <th>Mobile</th>
   <th>Contact</th>
   <th>Financer Address</th>
   <th>Loan Amount</th>
   </tr>
   <tr>
            <td>${loanId}</td>
            <td>${requesterAddress}</td>
            <td>${requesterName}</td>
            <td>${requesterMobile}</td>
            <td>${requesterPermanentAddress}</td>
            <td>${lenderAddress}</td> 
            <td>${loanAmount/1000000000000000000} ETH</td> 
            
          </tr></table>`
        document.querySelector('#resp').innerHTML = profileContent;
    })
}
function getLoanStatus() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    finance.loanStatus(document.getElementById("getLoanId").value, (err, loanData) => {
        if(err) return alert(err)
 let profileContent = ''
        let repaymentPeriod = loanData[0]
        let  settledAmount= loanData[1]
        let isApproved = loanData[2]
        let isExists = loanData[3]
        let isEnded = loanData[4]
        let dateApproved = loanData[5]
        
        profileContent += `
   <table>
   <tr>
   <th>Repayment Period</th>
   <th>Settled Amount</th>
   <th>Is Approved</th>
   <th>Is Exists</th>
   <th>Is Ended</th>
   <th>Approval Date</th>
   </tr>
   <tr>
            <td>${repaymentPeriod/2629746} Months</td>
            <td>${settledAmount/1000000000000000000} ETH</td>
            <td>${isApproved}</td>
            <td>${isExists}</td>
            <td>${isEnded}</td>
            <td>${dateApproved}</td>  
            
          </tr></table>`
        document.querySelector('#resp').innerHTML = profileContent;
    })
}
const address ="0xcc87abFda7b9Ac6C8bbb8801c028471C43CF2f91";
const abi=[{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allLenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"approveLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"endLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllLendersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getMyLoans","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyLoansLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getRequests","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRequestsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"uint256","name":"_poolCapacity","type":"uint256"}],"name":"registerlender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"repayAmount","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"address","name":"_lender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_repaymentPeriod","type":"uint256"}],"name":"requestLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];  finance= web3.eth.contract(abi).at(address);
finance= web3.eth.contract(abi).at(address);  
$(function () {
    var finance;
    $('#registerLender').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      finance.registerlender.sendTransaction(document.getElementById("lenderName").value,document.getElementById("address").value,document.getElementById("contactNumber").value,document.getElementById("poolCapacity").value,function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
  $('#approveLoan').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      finance.approveLoan.sendTransaction(document.getElementById("approveLoanId").value,{value: window.web3.toWei(document.getElementById("approvingAmount").value,'ether')},function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    $('#repayAmount').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      finance.repayAmount.sendTransaction(document.getElementById("repayLoanId").value,document.getElementById("repayLoanAmount").value*1000000000000000000,{value: window.web3.toWei(document.getElementById("repayLoanAmount").value,'ether')},function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
   $('#endLoan').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      finance.endLoan.sendTransaction(document.getElementById("endLoanId").value,function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    $('#requestLoan').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      finance.requestLoan.sendTransaction(document.getElementById("requesterName").value,document.getElementById("requesterContactNumber").value,document.getElementById("requesterAddress").value,document.getElementById("lenderAddress").value,document.getElementById("requestAmount").value*1000000000000000000,document.getElementById("repaymentPeriod").value*2629746,function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 3) {
        error("Wrong network detected. Please switch to the Ropsten test network.");
      } else {
        log("Connected to the Ropsten test network.");
        finance= web3.eth.contract(abi).at(address);
        }
    }
  });
