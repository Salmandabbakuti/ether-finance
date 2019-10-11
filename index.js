function log(message) {
   document.getElementById("log").innerHTML=message;
    console.log(message);
     }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
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
        let sectionsContent = ''
        maxLoans = maxLoans.toNumber()
        for(let i = 0; i < maxLoans; i++) {
            finance.getMyLoans(i, (err, loanData) => {
                sectionsContent += `<div class="message-box">
                    <div><b>Loan Id:</b> ${loanData[0]}</div>
                    <div><b>Lender:</b>${loanData[1]}</div>
                    <div><b>LoanAmount:</b> ${(loanData[2])/1000000000000000000}</div>
                     <div><b>Repayment Period:</b> ${loanData[3]}</div>
                </div>`

                if(i === maxLoans - 1) document.querySelector('#resp').innerHTML = sectionsContent;
            })
        }
    })
}
function getRequests() {
    finance.getRequestsLength((err, maxRequests) => {
        let sectionsContent = ''
        maxRequests = maxRequests.toNumber()
        for(let i = 0; i < maxRequests; i++) {
            finance.getRequests(i, (err, loanData) => {
                sectionsContent += `<div class="message-box">
                    <div><b>Loan Id:</b> ${loanData[0]}</div>
                    <div><b>Requester:</b>${loanData[1]}</div>
                    <div><b>LoanAmount:</b> ${loanData[2]/1000000000000000000} ETH</div>
                     <div><b>Contact Address:</b> ${loanData[3]}</div>
                </div>`

                if(i === maxRequests - 1) document.querySelector('#allRequests').innerHTML = sectionsContent
            })
        }
    })
}
function getAllLenders() {
    finance.getAllLendersLength((err, maxLenders) => {
        let sectionsContent = ''
        maxLenders = maxLenders.toNumber()
        for(let i = 0; i < maxLenders; i++) {
            finance.allLenders(i, (err, lenderData) => {
                sectionsContent += `<div class="message-box">
                    <div><b>Financer:</b> ${lenderData[0]}</div>
                    <div><b>Lender Name:</b> ${lenderData[1]}</div>
                    <div><b>Lender Contact Address:</b>${lenderData[4]}</div>
                     <div><b>Mobile:</b>${lenderData[5]}</div>
                     <div><b>Pool Capacity:</b> ${lenderData[6]} ETH</div>
                
                 </div>`

                if(i === maxLenders - 1) document.querySelector('#resp').innerHTML = sectionsContent;
            })
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
           <b>LoanId</b>: </br>
            <span>${loanId}</span> <br/>
            <b>Requester Address</b>: </br>
            <span>${requesterAddress}</span> <br/>
            <b>Name</b>: </br>
            <span>${requesterName}</span> <br/>
            <b>Mobile</b>:</br> 
            <span>${requesterMobile}</span> </br>
            <b>Requester Contact Address</b>: </br>
            <span>${requesterPermanentAddress}</span> <br/>
            <b>Financer Address</b>: </br>
            <span>${lenderAddress}</span> <br/>
            <b>Loan Amount</b>:</br> 
            <span>${loanAmount/1000000000000000000} ETH</span> 
            
           <br/>`
        document.querySelector('#resp').innerHTML = profileContent;
    })
}
function getLoanStatus() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    finance.loanStatus(document.getElementById("getloanIdStatus").value, (err, loanData) => {
        if(err) return alert(err)
 let profileContent = ''
        let repaymentPeriod = loanData[0]
        let  settledAmount= loanData[1]
        let isApproved = loanData[2]
        let isExists = loanData[3]
        let isEnded = loanData[4]
        let dateApproved = loanData[5]
        
        profileContent += `
           <b>Repayment Period</b>: </br>
            <span>${repaymentPeriod}</span> <br/>
            <b>Settled Amount</b>: </br>
            <span>${settledAmount/1000000000000000000} ETH</span> <br/>
            <b>Approval</b>: </br>
            <span>${isApproved}</span> <br/>
            <b>Existance</b>:</br> 
            <span>${isExists}</span></br>
            <b>Ended</b>: </br>
            <span>${isEnded}</span> <br/>
            <b>Approval Date</b>:</br> 
            <span>${dateApproved}</span> 
        
         <br/>`
        document.querySelector('#resp').innerHTML = profileContent;
    })
}
  const address ="0xcc87abFda7b9Ac6C8bbb8801c028471C43CF2f91";
const abi=[{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allLenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"approveLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"endLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllLendersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getMyLoans","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyLoansLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getRequests","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRequestsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"uint256","name":"_poolCapacity","type":"uint256"}],"name":"registerlender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"repayAmount","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"address","name":"_lender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_repaymentPeriod","type":"uint256"}],"name":"requestLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//const abi=[{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allLenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"approveLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"endLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllLendersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getMyLoans","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyLoansLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"uint256","name":"_poolCapacity","type":"uint256"}],"name":"registerlender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"repayAmount","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"address","name":"_lender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_repaymentPeriod","type":"uint256"}],"name":"requestLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//const abi = [{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allLenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"approveLoan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"endLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lenders","outputs":[{"internalType":"address payable","name":"lenderAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"bool","name":"created","type":"bool"},{"internalType":"string","name":"addr","type":"string"},{"internalType":"string","name":"contactNumber","type":"string"},{"internalType":"uint256","name":"poolCapacity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"}],"name":"loanStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"uint256","name":"_poolCapacity","type":"uint256"}],"name":"registerlender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_loanId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"repayAmount","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_contactNumber","type":"string"},{"internalType":"string","name":"_address","type":"string"},{"internalType":"address","name":"_lender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_repaymentPeriod","type":"uint256"}],"name":"requestLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
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
      finance.requestLoan.sendTransaction(document.getElementById("requesterName").value,document.getElementById("requesterContactNumber").value,document.getElementById("requesterAddress").value,document.getElementById("lenderAddress").value,document.getElementById("requestAmount").value*1000000000000000000,document.getElementById("repaymentPeriod").value,function (err, hash) {
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
