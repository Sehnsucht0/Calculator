/*let a = '', b = '',*/ const arrayInput = ['', ''];  /* delegare a tasto cancel il rimettere result a 0*/
let sign = '', result = null, i = 0, partialSign = false;
const display = document.querySelector(".display");
const decimal = document.querySelector(".decimal");
const container = document.querySelectorAll(".number-table button");
const elements = Array.from(container);
elements.forEach(press => press.addEventListener("click", function () {
    if (result == 'Error')
    {
        result = null;
        display.textContent = '';
    }
    let input = this.textContent;
    if (display.textContent.length > 12 && (isFinite(input)))       /*&& sign == ''*/
    {
        if (sign != '' && arrayInput[1] == '') display.textContent = '';
        else return;
    }  
    if (input == '0' && arrayInput[i] == '' && sign == '')
    {
        result = null;
        display.textContent = '';
        display.textContent = '0';
        return;
    }
    if (display.textContent == '0')
    {
        if (!(isFinite(input))) arrayInput[i] = '0';
        else display.textContent = '';
    }
    if (input == "C")
    {
        sign = '', result = null, i = 0, partialSign = false, arrayInput[0] = '', arrayInput[1] = '';
        display.textContent = '';
        decimal.removeAttribute("disabled");
        return;
    }
    else if (input == 'back')
    {
        if (result != null) return;
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent.includes('.') === false) decimal.removeAttribute("disabled");
        if (arrayInput[1] != '') arrayInput[1] = display.textContent;
        else arrayInput[0] = display.textContent;
        return;
    }
    else if (input == '=') operator (arrayInput, sign); /*se utente preme = prima del tempo?*/
    else
    {
        if (((!(isFinite(input))) || input == '0') && arrayInput [i] == '-') return;
        if (!(isFinite(input)) && input != '.')
        {
            if (i == 1) operator (arrayInput, sign);
            if ((arrayInput[0] == '' || arrayInput[0] == '-') && input == "-" && result == null)
            {
                if (arrayInput[0] == '' ) print (input);
                arrayInput [i] = '-';
            }
            else if ((((!(arrayInput[0] == '' && input == "-")) || result != null) && (arrayInput[0] !== '' || result != null) && sign == '')) 
            {
                sign = input;
                i++;
                if (sign == "+/-")
                {
                    let negativeArray = [display.textContent, null];
                    partialSign = true;
                    operator (negativeArray, sign);
                    arrayInput [0] = '', arrayInput [1] = '';
                }
            }
        }
        else if (i < 2)  
        {
            if (i === 1 || result != null)
            {
                if (arrayInput[1] == '') display.textContent = '';
                if (i === 0) result = null;
            }
            print (input);
            if (display.textContent == '0')  arrayInput [i] = '0';
            else arrayInput [i] += input;
            if (arrayInput[0] == '' || partialSign) 
            {
                arrayInput[0] = result;
                partialSign = false;
            }
        }
    }
    if (display.textContent.includes(".") === true) decimal.setAttribute("disabled", "");
    else decimal.removeAttribute("disabled");
}));

function add (a, b)
{
    return Number(a) + Number(b);
}

function subtract (a, b)
{
    return Number(a) - Number(b);
}

function multiply (a, b)
{
    return Number(a) * Number(b);
}

function divide (a, b)
{
    if (b == 0) return "Error";  // use Cancel?
    return Number(a) / Number(b);
}

function exp (a, b)
{
    if (a < 0 || b < 0) return "Error";
    return Number(a) ** Number(b);
}

function negative (a)

{
    return -Number(a);
}

function print (a)
{
    display.textContent += a;
}

function operator (array, sign_local)
{
    let a = array [0], b = array [1];
    if (sign_local != "+/-" && (a == '' || b == '')) return;
    if (sign_local == "+") result = add (a, b);
    if (sign_local == "-") result = subtract (a, b);
    if (sign_local == "x") result = multiply(a, b);
    if (sign_local == "÷") result = divide(a, b);
    if (sign_local == "^") result = exp (a, b);
    if (sign_local == "+/-") result = negative (a);
    array [0] = '', array [1] = '', sign = '', i = 0;
    if (result.toString().length > 13) result = result.toExponential(7); //4 to exp notation (e+35) //2 to integer (5.)   13-6 = 7           //if (result.toString().length > 12) result = result.toFixed(12);
    display.textContent = result;
}