
let common = {
  scrollToTop: function (that) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //that.scrollTop = scrollTop;

    let tilteBarFix = scrollTop > 70;
    if (scrollTop > 70) {
        tilteBarFix = true;
    }
    console.log(tilteBarFix)
    return tilteBarFix;
  }
}


export default common;
