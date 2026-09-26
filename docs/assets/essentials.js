var SwitchButtonPhrase, // 切换模式时按钮控件中变化的部分
    SwitchButton, // 切换按钮整体
    DarkBool, // 是否深色
    SwitchButtonPhraseCase0, // 变化类名1 - 起始
    SwitchButtonPhraseCase1; // 变化类名2 - 结束

const InitialEssentials
 = (DarkmodeSwitchButtonFrame, 
    DarkmodeSwitchButtonIcon, 
    SwitchButtonPhraseClass0 = 'mode-dark-class', 
    SwitchButtonPhraseClass1 = 'mode-light-class') => 
    {
        SwitchButtonPhrase = document.getElementById(DarkmodeSwitchButtonIcon);
        SwitchButton = document.getElementById(DarkmodeSwitchButtonFrame);
        SwitchButton.addEventListener('click', ()=>{DarkSwitch()});
        SwitchButtonPhraseCase0 = SwitchButtonPhraseClass0;
        SwitchButtonPhraseCase1 = SwitchButtonPhraseClass1;
    }

window.onload = () => {
    
    FollowOS();
    DarkBool = false;
    // if ( localStorage.getItem('theme').includes('dark') || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) DarkBool = true;
    // else DarkBool = false;
    DarkSwitch((localStorage.getItem('theme').includes('dark') || (!/*('theme' in localStorage) && */window.matchMedia('(prefers-color-scheme: dark)').matches)));

    iframes = document.getElementsByTagName('iframe');

    var currUA = navigator.userAgent;
    console.log(currUA);
    if (currUA.includes('AppleWebKit') && !currUA.includes('hrome')) alertt('Error may occur on your browser: \nPlease try to use any browser with chromium core(blink, like the latest ms-edge), or with Gecko (like firefox) as core.', 'Warning of Compability', 'warning');
    else if (currUA.includes('Safari') && !currUA.includes('hrome')) alertt('Error may occur on your browser: \nPlease try to use any browser with chromium core(blink, like the latest ms-edge), or with Gecko (like firefox) as core.', 'Warning of Compability', 'warning');
    if (window.innerWidth < 625)
        alertt(`Your device's screen is too small. Perhaps you need to rotate your screen to use this? Current width: ${window.innerWidth} is way lower than recommended: 625px. \n\n Your UA:\n${currUA}. \nRecommend Blink(Edge, Chrome) or Gecko(Firefox) to avoid Compability Issues.`, "Screen too Small", "warning");

}

//  bi-moon bi-sun

const DarkSwitch = (n = false) => {
    if(!(n || DarkBool)){
        // if(DarkBool){
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        DarkBool = true;
        SwitchButtonPhrase.classList.replace('bi-sun', 'bi-moon');

    }else{
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        DarkBool = false;
        SwitchButtonPhrase.classList.replace('bi-moon', 'bi-sun');

    }
    console.log('Root switch dmode to: ' + n + ', while DarkBool is: ' + DarkBool);
    for(var ifr of document.getElementsByTagName('iframe')){
        ifr.contentWindow.DarkSwitch(DarkBool);
    }

}
// Whenever the user explicitly chooses to respect the OS preference, use: 
const FollowOS = () => {localStorage.setItem('theme', '');}

const jslink = (linkto, method = "_blank") => {
    var al = document.createElement('a');
        al.setAttribute('class', 'hidden');
        al.setAttribute('target', method);
        al.setAttribute('href', `${linkto}`);
        document.body.appendChild(al);
        al.click();
        al.remove();
        delete al;
}

const ScrollToElement = (TargetElement) => {
    window.ScrollToElement(TargetElement)
}