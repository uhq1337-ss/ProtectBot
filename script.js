const tabs=document.querySelectorAll('.category-tab');
const cards=document.querySelectorAll('.product-card');
const count=document.querySelector('.products-count');
function updateCount(){const visible=[...cards].filter(card=>!card.classList.contains('hidden')).length;if(count)count.textContent=`${visible} produits`;}
tabs.forEach(tab=>{tab.addEventListener('click',()=>{const category=tab.dataset.category;tabs.forEach(btn=>btn.classList.remove('active'));tab.classList.add('active');cards.forEach(card=>{const match=category==='all'||card.dataset.category===category;card.classList.toggle('hidden',!match);});updateCount();});});
updateCount();
