module.exports = (tempCard,el)=> {
    let output=tempCard.replace(/{%productName%}/g,el.productName);
    output=output.replace(/{%image%}/g,el.image);
    output=output.replace(/{%price%}/g,el.price);
    output=output.replace(/{%from%}/g,el.from);
    output=output.replace(/{%nutrients%}/g,el.nutrients);
    output=output.replace(/{%quantity%}/g,el.quantity);
    output=output.replace(/{%description%}/g,el.description);
    output=output.replace(/{%id%}/g,el.id);
    if(!el.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
};