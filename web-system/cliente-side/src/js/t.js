var doc = document.getElementById("input_button");
doc.addEventListener('click',(evt)=>{
    var file  = document.querySelector('input[type=file]').files[0];
    // (file.name) propriedade Onde fica o nome do arquivo
    // (file.lastModifiedDate) Data de modificacao do arquivo
    var reader  = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function () {
        mammoth.convertToHtml({arrayBuffer: reader.result})
        .then(function(result){
            var html = result.value; // The generated HTML (html.length
            //estilizar html aqui
           document.getElementById("container").innerHTML=html;
            //Geração de documento 
            var docDefinition = {
                content: [
                    
                ],	
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                }
              };

            // console.log("HTML_MAP="+html);
            var container = document.querySelectorAll('.container > *');   
            for(var i=0; i<container.length; i++){
                if(container[i].tagName == 'H1'){
                    var h1 = container[i].textContent;
                    
                    var titulo = {text: h1, style: 'header'}
                    docDefinition.content.push(titulo);
                }
                if(container[i].tagName == 'P'){
                    var p = container[i].textContent;
                    docDefinition.content.push(p);
                }
                if(container[i].tagName == 'OL'){
                    var list = container[i].querySelectorAll('.container > ol > li');
                    console.log('list='+list)
                    var oll = {
                        ol: [
                            
                        ]
                    }

                    for(var z=0; z<list.length; z++){
                        oll.ol.push(list[z].innerText);
                    }
                    docDefinition.content.push(oll);
                }
                if(container[i].tagName == 'TABLE'){
                    var t = container[i].querySelectorAll('.container > table > tbody > tr > td > p');
                    var qtd = container[i].querySelectorAll('.container > table > tbody > tr');
                    var temp = container[i].querySelectorAll('.container > table > tbody > tr > td');
                    // console.log(temp.length)
                    // console.log('linhas===>>>'+qtd.length);
                    num_colunas = (temp.length/qtd.length);

                    // console.log('numColunas===>>>'+num_colunas);
                    var itens = [];
                    var tabela = {
                            layout: 'lightHorizontalLines', // optional
                            table: {
                            headerRows: 1,
                            widths: [],
                            body: []
                            }
                    }                    
                    var n=0;//contador 

                    var colunnWidths;                    
                    async function pushItens(tabela) {
                                    
                                try {
                                    await tabela.table.body.push(itens);
                                      
                                } catch(e) {
                                    console.log(e);
                                }
                                   
                    }

                    async function pushWidths(tabela) {
                                    
                                    try {
                                      await tabela.table.widths.push('*');
                                      
                                    } catch(e) {
                                      console.log(e);
                                    }
                                   
                    }

                    async function insertTable(docDefinition,table) {
                                    
                        try {
                          await docDefinition.content.push(table);
                          
                        } catch(e) {
                          console.log(e);
                        }
                       
                    }
                    for(var x=0; x<t.length; x++){//percorre itens
                            itens.push(t[x].innerText);
                            n++;
                            if(n==num_colunas){
                                // console.log('n===>>>'+n);
                                colunnWidths=n;
                                pushItens(tabela);

                                
                                itens=[];
                                n=0;
                            }  
                    }
                    if(colunnWidths==num_colunas){
                        for(var temp =0; temp<colunnWidths; temp++){
                            pushWidths(tabela);
                        }
                            
                    }else{
                        console.log("Erro");
                    }
                    insertTable(docDefinition,tabela);
                        // docDefinition.content.push(tabela);
                        // tabela.table.widths=[];
                }
            }
            // console.log(docDefinition);
            pdfMake.createPdf(docDefinition).download();

            var messages = result.messages; // Any messages, such as warnings during conversion
        }).done();}

    evt.preventDefault();
})

// abort()
// readAsArrayBuffer()
// readAsBinaryString()
// readAsDataURL()
// readAsText()
  
