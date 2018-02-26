function convert() {

    // Pobranie wartości z pól
    var inputAmount = document.getElementById("input-amount").value;
    var inputCurrency = document.getElementById("input-currency").value;
    var outputCurrency = document.getElementById("output-currency").value;

    // Jeśli wpisano nieliczbę lub dziesiętną z przecinkiem
    if (isNaN(inputAmount)) {
        // Zamiana przecinka na kropkę
        inputAmount = inputAmount.replace(',','.');
        if (isNaN(inputAmount)) {
            // Wypisanie ostrzeżenia
            document.getElementById("warning").innerHTML = "<span>Proszę wpisać liczbę.</span>";
        } else {
            document.getElementById("input-amount").value = inputAmount;
            justdoit();
        }     
    }
    // Jeśli nic nie wpisano
    else if (inputAmount === '') {
        // Wyczyszczenie ostrzeżenia
        document.getElementById("warning").innerHTML = "";
        // Wypisanie zera w inpucie wyjściowym
        document.getElementById("output-amount").value = 0;
    }
    // Jeśli wybrane waluty się nie różnią
    else if (inputCurrency === outputCurrency) {
        document.getElementById("warning").innerHTML = "";
        // Wypisanie tej samej wartości, która jest w polu wejściowym
        document.getElementById("output-amount").value = inputAmount;
    }
    else {
        justdoit(); 
    }

    function justdoit() {
        document.getElementById("warning").innerHTML = "";
        
        // Zadeklarowanie żądania XMLHttp
        var getJson = new XMLHttpRequest();

        // Otwarcie żądania metodą GET (synchronicznie - ostani paramter false)
        // Paramter URL: Ostani kurs (latest) pomiędzy wybranymi walutami
        getJson.open("GET", "https://api.fixer.io/latest?base=" + inputCurrency + "&symbols" + outputCurrency, false)
        getJson.send();
        // Przykł.: {"base":"PLN","date":"2018-02-23","rates":{"EUR":0.23982}}
        // Parsowanie Dżejsona 
        var response = JSON.parse(getJson.responseText);

        // Wydobycie wartości kursu pomiędzy wybranymi walutami (Ile outputCurrency za 1 inputCurrency)
        var latestRate = response.rates[outputCurrency];
        
        // Obliczenie wyniku
        var outputAmount = latestRate * inputAmount;

        // Wypisanie obliczonej wartości (zaokrąglonej do 2 miejsc po przecinku)
        document.getElementById("output-amount").value = outputAmount.toFixed(2);

        // Dodanie klasy, która po pierwszym użyciu wizualnie "odblokowuje" input wyjściowy
        document.getElementById("output-amount").classList.remove('faded');

        // Wypisanie daty kursu
        var rateDate =  response.date;
        document.getElementById("rate-date").innerHTML = " z dnia " + rateDate + ", ";
    }
}