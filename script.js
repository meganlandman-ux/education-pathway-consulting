(function(){
  // Mobile menu
  var btn=document.getElementById('menuBtn'),menu=document.getElementById('mobileMenu');
  if(btn&&menu){
    var ico=btn.querySelector('use');
    function setMenu(open){menu.hidden=!open;btn.setAttribute('aria-expanded',open);btn.setAttribute('aria-label',open?'Close menu':'Open menu');ico.setAttribute('href',open?'#i-close':'#i-menu');}
    btn.addEventListener('click',function(){setMenu(menu.hidden);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){setMenu(false);btn.focus();}});
  }

  // Intake form (Start Your Pathway page only)
  var form=document.getElementById('intakeForm');
  if(!form)return;
  var submitBtn=document.getElementById('submitBtn');
  function setMode(mode){
    var r=document.getElementById('mode-'+mode); if(!r)return;
    r.checked=true;
    form.querySelectorAll('fieldset[data-for]').forEach(function(fs){fs.hidden=fs.dataset.for!==mode;});
    submitBtn.firstChild.textContent=mode==='question'?'Send My Question ':'Start My Pathway Research ';
  }
  form.querySelectorAll('input[name=mode]').forEach(function(r){r.addEventListener('change',function(){setMode(r.value);});});
  // start-your-pathway.html#question opens the form in question mode
  function fromHash(){ if(location.hash==='#question'){setMode('question');} }
  fromHash(); window.addEventListener('hashchange',fromHash);

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var first=null;
    form.querySelectorAll('.err').forEach(function(n){n.remove();});
    form.querySelectorAll('.field').forEach(function(f){f.classList.remove('invalid');});
    form.querySelectorAll('[required]').forEach(function(el){
      if(el.closest('fieldset[hidden]'))return;
      var ok=el.type==='checkbox'?el.checked:(el.value.trim()!==''&&el.checkValidity());
      if(!ok){
        var field=el.closest('.field');
        var msg=document.createElement('span');msg.className='err';
        msg.textContent=el.type==='email'&&el.value?'Enter an email address like name@example.com.':el.type==='checkbox'?'Please tick this box to continue.':'Please fill this in.';
        if(field){field.classList.add('invalid');field.appendChild(msg);}else{el.closest('label').after(msg);}
        first=first||el;
      }
    });
    if(first){first.focus();return;}
    var q=document.getElementById('mode-question').checked;
    var name=document.getElementById('f-name').value.trim().split(' ')[0];
    document.getElementById('successTitle').textContent=q?'Thanks, '+name+'. We’ve got your question.':'Thanks, '+name+'. We’ve got your destination.';
    document.getElementById('successText').textContent=q?'In the live version, we would reply by email. This prototype hasn’t sent anything.':'Destination noted: “'+document.getElementById('f-goal').value.trim()+'”. In the live version, we would confirm the scope of your pathway research with you by email before we begin. This prototype hasn’t sent anything.';
    form.hidden=true;var s=document.getElementById('formSuccess');s.hidden=false;s.focus();
  });
  document.getElementById('resetForm').addEventListener('click',function(){document.getElementById('formSuccess').hidden=true;form.hidden=false;form.querySelector('input,select,textarea').focus();});
})();
