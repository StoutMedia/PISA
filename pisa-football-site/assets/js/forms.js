(function(){
  const SUCCESS='Thank you. Your information has been received. The PISA team will contact you shortly.';
  function getLeads(){try{return JSON.parse(localStorage.getItem('pisaLeads')||'[]')}catch(e){return []}}
  function saveLead(lead){const pisaLeads=getLeads();pisaLeads.push(lead);localStorage.setItem('pisaLeads',JSON.stringify(pisaLeads));window.pisaLeads=pisaLeads;console.log('pisaLeads',pisaLeads);}
  function dataFrom(form){const fd=new FormData(form);const data={};fd.forEach((v,k)=>{if(data[k]){data[k]=[].concat(data[k],v)}else data[k]=v});return data;}
  function invalid(form){const msg=form.querySelector('.form-message');if(!form.checkValidity()){form.reportValidity();if(msg){msg.textContent='Please complete all required fields before submitting.';msg.classList.add('error');}return true}return false;}
  document.querySelectorAll('.lead-form').forEach(form=>{
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(invalid(form))return;
      const message=form.querySelector('.form-message');
      const lead={...dataFrom(form),formName:form.dataset.formName||'PISA Form',notificationEmail:form.dataset.notificationEmail||'rob@stoutmedias.com',submittedAt:new Date().toISOString(),page:location.pathname.split('/').pop()||'index.html'};
      saveLead(lead);
      // Future backend connection point:
      // 1. POST lead to Formspree/Web3Forms/Netlify Forms endpoint or WordPress WPForms/Fluent Forms/Gravity Forms/Elementor Forms handler.
      // 2. Send email notification to rob@stoutmedias.com.
      // 3. Sync contact and program interest to a CRM.
      // 4. Append the lead to Google Sheets.
      // 5. Add opt-in contacts to Mailchimp.
      // 6. For paid products or registrations, redirect to a secure Stripe Checkout Session created server-side.
      if(message){message.textContent=SUCCESS;message.classList.remove('error');}
      form.reset();
      const redirect=form.dataset.redirect;
      if(redirect){setTimeout(()=>{window.location.href=redirect;},650);}
    });
  });
  window.pisaLeads=getLeads();
})();
