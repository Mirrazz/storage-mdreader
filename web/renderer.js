/**
(C) 2022 Mirrazz
See the LISCENCE file for more information
*/
// On Mirrazz, it is attached to mirrazz.md
// This object is for any JavaScript project
var MRZMarkDown={
  toHtml:function(md) {
    var output="";
    var isNewLine=true
    var isBold=false
    var isItalic=false
    var isUnderline=false
    var isStrike=false
    var isCode=false
    var isLink=false
    var isLinkTitle=false
    var isMultiLineCode=false
    var isGettingCodeType=false
    var isUsI=false
    var mlcodeType=""
    var isHeading=false
    var headingKind="0"
    var isUL=false
    for(var i=0;i<md.length;i++){
      if(md[i]=="\n"&&isHeading) {
        isHeading=false
        output+="</h"+headingKind+">"
      }
      if(md[i]=="\n"&&isUL) {
        isUL=false
        output+="</li></ul>"
      }
      if(isCode){
        if(md[i]=="\\") {
          i++
          output+="&#x"+md[i].charCodeAt(0).toString(16)+";"
        } else if(md[i]=="`") {
          output+="</code>"
          isCode=false
        } else {
          output+="&#x"+md[i].charCodeAt(0).toString(16)+";"
        }
      } else if(isGettingCodeType) {
        if(md[i]=="\n") {
          isGettingCodeType=false
          output+='<pre data-codetype="'+mlcodeType+'">'
          mlcodeType=""
        } else {
          mlcodeType+="&#x"+md[i].charCodeAt(0).toString(16)+";"
        }
      } else if(isMultiLineCode) {
        if(md[i]=="\\") {
          i++
          if(md[i]=="\n"){
            output+="\n"
          } else {
            output+="&#x"+md[i].charCodeAt(0).toString(16)+";"
          }
        } else if(md[i]=="`"&&md[i+1]==="`"&&md[i+2]==="`") {
          output+="</pre>"
          isMultiLineCode=false
        } else {
          if(md[i]=="\n"){
            output+="\n"
          } else {
            output+="&#x"+md[i].charCodeAt(0).toString(16)+";"
          }
        }
      } else if((isNewLine||md[i-1]==="\n")&&md[i]=="#") {
        if(md[i+1]!="#"&&md[i+1]!=" ") {
          output+="#"
        } else {
          i++
          headingKind=1
          isHeading=true
          if(md[i]=="#"&&(md[i+1]==" "||md[i+1]=="#")) {
            headingKind=2
            i++
            if(md[i]=="#"&&(md[i+1]==" "||md[i+1]=="#")) {
              headingKind++
              i++
              if(md[i]=="#"&&(md[i+1]==" "||md[i+1]=="#")) {
                headingKind++
                i++
                if(md[i]=="#"&&(md[i+1]==" ")) {
                  headingKind++
                  i++
                }
              }
            }
          }
          output+="<h"+headingKind+">"
        }
      } else if(md[i]==="\n"){
        if(md[i-1]==="\n"){
          output+="<br/>"
        } else {
          output+="\n"
        }
      } else if(md[i]==="_") {
        if(md[i+1]=="_"){
          isUnderline=!isUnderline
          i++
          if(isUnderline) {
            output+="<u>"
          } else {
            output+="</u>"
          }
        } else {
          isUsI=!isUsI
          if(isUsI) {
            output+="<em>"
          } else {
            output+="</em>"
          }
        }
      } else if(md[i]==="\\") {
        i++;
        if(md[i]=="\\") {
          output+="\\"
        } else if(md[i]=="*") {
          output+="*"
        } else if(md[i]=="_") {
          output+="_"
        } else if(md[i]=="~") {
          output+="~"
        } else {
          output+="&#x"+md.charCodeAt(i).toString(16)+";"
        }
      } else if(md[i]==="~" && md[i+1]==="~") {
        isStrike=!isStrike;
        i++
        if(isStrike) {
          output+="<strike>"
        } else {
          output+="</strike>"
        }
      } else if(md[i]==="`") {
        if(md[i+1]==="`"&&md[i+2]==="`") {
          isGettingCodeType=true;
          isMultiLineCode=true
        } else {
          isCode=true
          output+="<code>"
        }
      } else if(md[i]=="*"&&isNewLine&&md[i+1]==" ") {
        output+="<ul><li>"
        isUL=true
      } else if(md[i]=="-"&&isNewLine&&md[i+1]==" ") {
        output+="<ul><li>"
        isUL=true
      } else if(md[i]==="*") {
        if(md[i+1]=="*") {
          isBold=!isBold
          if(isBold) {
            output+="<strong>"
          } else {
            output+="</strong>"
          }
          i++
        } else {
          isItalic=!isItalic
          if(isItalic) {
            output+="<em>"
          } else {
            output+="</em>"
          }
        }
      } else {
        output+="&#x"+md.charCodeAt(i).toString(16)+";"
      }
      if(md[i]==="\n"){
        isNewLine=true
      } else {
        isNewLine=false
      }
    }
    return output
  }
}
