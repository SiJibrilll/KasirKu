var lineAmmount = 0;
var buttonIndex = 1;

function addLine() {
	var line = document.createElement("li");
	line.id ="l" + buttonIndex;
	line.style = "list-style-type:none; width: 100%"
	document.getElementById("list").appendChild(line);
	
	var forum = document.createElement("div");
	forum.id = "forum";
	line.appendChild(forum);

	var item = document.createElement("input");
	item.name = "nama";
	item.id = "inputbox";
	item.type = "text";
	item.value = "Nama Barang";
	forum.appendChild(item);

	var item = document.createElement("input");
	item.name = "harga";
	item.id = "inputbox";
	item.type = "text";
	item.value = "Harga Barang";
	forum.appendChild(item);

	var item = document.createElement("input");
	item.name = "jumlah";
	item.id = "inputbox";
	item.type = "text";
	item.value = "Jumlah Barang";
	forum.appendChild(item);

	var item = document.createElement("input");
	item.name = "diskon";
	item.id = "inputbox";
	item.type = "text";
	item.value = "Diskon Perbarang (Dalam persen)";
	forum.appendChild(item);

	var kurang = document.createElement("button");
	kurang.id = "kurang";
	kurang.innerHTML = "-";
	kurang.name = buttonIndex;
	kurang.addEventListener('click', () => {
	  removeLine(kurang.name);
	})
	forum.appendChild(kurang);
	buttonIndex++;

	lineAmmount ++;
	if (lineAmmount >= 5) {
		document.getElementById("footer").style.position = "static";
		document.getElementById("footer").style.margin = "0px";
	};
};

addLine();

function removeLine(name) {
	lineAmmount--
	var i = "l" + name;
	var apus = document.getElementById(i);
	document.getElementById("list").removeChild(apus);
	if (lineAmmount <= 5) {
		document.getElementById("footer").style.position = "fixed";
		document.getElementById("footer").style.margin = "10px";
	};
};



function jumlah(barang){
	var node = barang.parentNode.childNodes[2];
	if (!isNaN(node.value)  && node.value != "") {
			return parseFloat(node.value);
		};

	return 1;
};

function diskon(barang){
	var node = barang.parentNode.childNodes[3];
	if (!isNaN(node.value)  && node.value != "") {
			return parseFloat(node.value);
		};

	return 0;
};

var listHarga = [];
var listdiskon = [];
var listJumlah = [];

function harga() {
	var totalharga = 0;
	listHarga = [];
	listdiskon = [];
	listJumlah = [];
	var harga = document.getElementsByName("harga");
	for (var i=0; i< harga.length; i++) {
		var barang =  jumlah(harga[i]);
		var potongan = diskon(harga[i]);
		listdiskon.push(potongan);
		listJumlah.push(barang);

		if (!isNaN(harga[i].value)  && harga[i].value != "") {
			var hasil = parseFloat(harga[i].value) * barang;
			if (potongan > 0) {
				hasil -= hasil * potongan / 100;
			};
			listHarga.push(hasil);
			totalharga += hasil;
		} else {
			listHarga.push(0);
		};
	};
	return totalharga;
};


var tulisDiskonTotal = 0;
function diskonTotal(harga) {
	tulisDiskonTotal = 0;
	var potongan = harga;
	var node = document.getElementsByName("diskon total")[0];
	var diskon = 0;
	if (!isNaN(node.value) && node.value != "") {
			diskon = parseFloat(node.value);
			tulisDiskonTotal = diskon;
		};

		if (diskon > 0) {
			return harga - potongan * diskon / 100;
		};
		return harga
};


var struk = "               Kasirku.com               \n-----------------------------------------\n";

var namaBarang = [];

function namafunc() {
	var namaBarang = [];
	var namaList = document.getElementsByName("nama");
	for (var i=0; i<namaList.length;i++) {
		namaBarang.push(namaList[i].value)
	};
	return namaBarang;
};


function nulis() {
	struk = "               Kasirku.com               \n-----------------------------------------\n";
	var barangBarang = namafunc();
	for (var i=0; i<barangBarang.length;i++) {
		struk += "\n" + barangBarang[i] + " | Jumlah : " + listJumlah[i] + " |  Harga : " + listHarga[i] + " Diskon : " + listdiskon[i] + "%";
	};
	struk += "\n\n-----------------------------------------"
	struk += "\nDiskon Total : " + tulisDiskonTotal + "%";
	struk += "\nTotal Harga : " + tulisHargaTotal;
	struk += "\nTerima Kasih telah berbelanja dengan kami";
};

function cetak() {
	var textFile = null,
  	makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var cetak = document.getElementById("cetak");
  cetak.href = makeTextFile(struk);
};


var tulisHargaTotal;
function hitung() {
	var hasilfuntionharga = harga();
	var potongTotal = diskonTotal(hasilfuntionharga);
	tulisHargaTotal = potongTotal;
	if (!isNaN(hasilfuntionharga)) {
		document.getElementById("footerharga").innerHTML = potongTotal;
	};

	nulis();
	cetak();
};

