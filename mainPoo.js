class Usuario{
    constructor(nombre,saldo,password,record){
        this.nombre=    nombre;
        this.saldo=     saldo;
        this.password=  password;
        this.record=    record;

    }

    _getRecord(){
        return this.record;
    }
    _getSaldo(){
        return this.saldo;
    }
    _getName(){
        return this.nombre;
    }
    _getPassword(){
        return this.password;
    }

    _setSaldo(newSaldo){
        this.saldo = newSaldo;
    }

    addRecord=(objAdd) => {
        this.record.push(objAdd)
    }
}

const userAcount=[
    new Usuario("Tina",250,"8090",[{r_movimiento:"Deposito",r_cantidad:250, r_saldoActual:250,r_fecha:"18/07/21"}]),
    new Usuario("Alejandro",200,"19",[{r_movimiento:"Deposito",r_cantidad:200, r_saldoActual:200,r_fecha:"18/07/21"}]),
    new Usuario("Ryuko",900,"12",[{r_movimiento:"Deposito",r_cantidad:900, r_saldoActual:900,r_fecha:"18/07/21"}])
];


    let userHandler={};//Variable global a usar

    document.getElementById('btn-logIn').addEventListener('click',function(){
        let name = document.getElementById("name").value;
        let passwordLet = document.getElementById("password").value;
        let found=userAcount.find( ({nombre =_getName(),password=_getPassword}) => nombre===name&&password===passwordLet);
        if(found){
            recordMov(found)
            document.getElementById("firstPage").style.display = 'none';  
            document.getElementById("Dashboard").style.display = 'grid';
            document.getElementById("nameUserAcount").innerHTML=found._getName();
            consultarSaldo(found)
            userHandler=found;
            let name = document.getElementById("name").value="";
            let passwordLet = document.getElementById("password").value="";
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
        let currentBalace = "$" + user._getSaldo();
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
            let sumaDeposito = userA._getSaldo() + montoDeposito;

            if(sumaDeposito<=990){
                alert('Deposito hecho correctamente')
                userA._setSaldo(sumaDeposito);
                userA.addRecord({r_movimiento:"Deposito",r_cantidad:montoDeposito, r_saldoActual:sumaDeposito,r_fecha:"18/07/21"})
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
            restaRetiro = userA._getSaldo() - montoRetiro;
            if(restaRetiro >= 10){
                alert('Retiro hecho correctamente')
                userA._setSaldo(restaRetiro);
                userA.addRecord({r_movimiento:"Retiro",r_cantidad:montoRetiro, r_saldoActual:restaRetiro,r_fecha:"18/07/21"})
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
        obj._getRecord().forEach((element,index) => {
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

    //Cerrar Sesion
    function confirmAction() {
        let confirmAction = confirm("Estas seguro de querer cerrar la sesion?");
        if (confirmAction) {
            document.getElementById("firstPage").style.display = 'flex';  
            document.getElementById("Dashboard").style.display = 'none';
        } else {
          
        }
    }

    document.getElementById("closeSesion").addEventListener('click',()=>{
        confirmAction()
    });

