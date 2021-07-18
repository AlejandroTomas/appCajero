const userAcount =[
    {nombre:"Nakamura Tina",saldo:250,password:"Matoi_Ryuko",record:[{r_movimiento:"Deposito",r_cantidad:250, r_saldoActual:250,r_fecha:"18/07/21"},]},
    {nombre:"Alejandro",saldo:200,password:"NakamuraTina919",record:[{r_movimiento:"Deposito",r_cantidad:200, r_saldoActual:200,r_fecha:"18/07/21"},]},
    {nombre:"Ryuko",saldo:900,password:"12",record:[{r_movimiento:"Deposito",r_cantidad:900, r_saldoActual:900,r_fecha:"18/07/21"},]
}];

    //Inicio de sesion buscando al usuario
    let userHandler={};
    document.getElementById('btn-logIn').addEventListener('click',function(){
        let name = document.getElementById("name").value;
        let passwordLet = document.getElementById("password").value;
        let found=userAcount.find( ({nombre,password}) => nombre===name&&password===passwordLet);
        recordMov(found)
        if(found){
            document.getElementById("firstPage").style.display = 'none';  
            document.getElementById("Dashboard").style.display = 'grid';    
            consultarSaldo(found)
            userHandler=found;
        }else{
            alert("Usuario o Contraseña Incorrectos")
            document.getElementById("password").value="";
        }
    });
    
    //Menu de consulta, deposito, retiro
    var actConsulta = document.getElementById('screen-1'); //0
    var actDeposito = document.getElementById('screen-2'); //1
    var actRetiro = document.getElementById('screen-3'); //2

    function getIndicador(nextPage) {
        let indicador = [
            document.getElementById('act-1').getAttribute('state'),
            document.getElementById('act-2').getAttribute('state'),
            document.getElementById('act-3').getAttribute('state')
        ];
        let elementScreen = [
            document.getElementById('act-1'),
            document.getElementById('act-2'),
            document.getElementById('act-3')
        ];
        let currentIndicador = indicador.indexOf('active');
        elementScreen[currentIndicador].setAttribute('state', 'disiable');
        switch (currentIndicador) {
            case 0:
                if (nextPage.getAttribute('pointerScreen') == "1") {
                    actConsulta.style.display = 'none';
                    nextPage.setAttribute('state', 'active');
                    actDeposito.style.display = 'flex';
                } else if (nextPage.getAttribute('pointerScreen') == "2") {
                    actConsulta.style.display = 'none';
                    nextPage.setAttribute('state', 'active')
                    actRetiro.style.display = 'flex';
                }
                break;
            case 1:
                if (nextPage.getAttribute('pointerScreen') == "0") {
                    actDeposito.style.display = 'none';
                    nextPage.setAttribute('state', 'active')
                    actConsulta.style.display = 'flex';
                } else if (nextPage.getAttribute('pointerScreen') == "2") {
                    actDeposito.style.display = 'none';
                    nextPage.setAttribute('state', 'active')
                    actRetiro.style.display = 'flex';
                }
                break;
            case 2:
                if (nextPage.getAttribute('pointerScreen') == "0") {
                    actRetiro.style.display = 'none';
                    nextPage.setAttribute('state', 'active')
                    actConsulta.style.display = 'flex';
                } else if (nextPage.getAttribute('pointerScreen') == "1") {
                    actRetiro.style.display = 'none';
                    nextPage.setAttribute('state', 'active')
                    actDeposito.style.display = 'flex';
                }
                break;
        }
        nextPage.setAttribute('state', 'active');
    }


    //Funcionamiento de estado de cuenta/CONSULTA
    function consultarSaldo(user) {
        let currentBalace = "$" + user.saldo;
        document.getElementById('saldoTagP').textContent = currentBalace;
        document.getElementById('saldoSpan').textContent = currentBalace;
        document.getElementById('saldoSpanSreen3').textContent = currentBalace;
    }

    //Funcionamiento de DEPOSITO
    document.getElementById('btn-Dep').addEventListener('click', function () {
        let monto = parseInt(document.getElementById('input-Dep').value);
        deposito(userHandler, monto)
    });
    function deposito(userA, montoDeposito) {
        if (montoDeposito > 0) {
            let sumaDeposito = userA.saldo + montoDeposito;
            if(sumaDeposito<=990){
                alert('Deposito hecho correctamente')
                userA.saldo = sumaDeposito;
                userA.record.push({r_movimiento:"Deposito",r_cantidad:montoDeposito, r_saldoActual:sumaDeposito,r_fecha:"18/07/21"})
                recordMov(userA)
                consultarSaldo(userA)
            }else{
                alert("La cantidad del deposito hace que su cuenta sobrepase el tope de saldo permitido")
            }
            document.getElementById('input-Dep').value = "";
        } else {
            alert('Deposito no completado, monto insuficiente')
            document.getElementById('input-Dep').value = "";
        }
    }


    //Funcionamiento de RETIRO
    document.getElementById('btn-Ret').addEventListener('click', function () {
        let monto = parseInt(document.getElementById('input-Ret').value);
        retiro(userHandler, monto)
    });
    function retiro(userA, montoRetiro) {
        if (montoRetiro > 0) {
            restaRetiro = userA.saldo - montoRetiro;
            if(restaRetiro >= 10){
                alert('Retiro hecho correctamente')
                userA.saldo = restaRetiro;
                userA.record.push({r_movimiento:"Retiro",r_cantidad:montoRetiro, r_saldoActual:restaRetiro,r_fecha:"18/07/21"})
                recordMov(userA)
                consultarSaldo(userA);
            }else{
                alert("La cantidad del retiro hace que su cuenta este bajo el limite de saldo permitido")
            }
            document.getElementById('input-Ret').value = "";
        } else {
            alert('Retiro no completado, no tiene el monto a retirar')
            document.getElementById('input-Ret').value = "";
        }
    };


    //Historial de transacciones
    function recordMov(obj){
        //Primero limpia todo
        $(".agregado").remove();
        obj.record.forEach((element,index) => {
            var plantilla = ` 
            <tr class="agregado">
                <td class="dataTable">${element.r_movimiento}</td>
                <td class="dataTable">${element.r_cantidad}</td>
                <td class="dataTable">${element.r_saldoActual}</td>
                <td class="dataTable">${element.r_fecha}</td>
            </tr>
        `;

        $("#bodyTab").append(plantilla);
        });
        

    }

    
