(function(){
  function syncSelectedState(root){
    var lists = root.querySelectorAll('.color-swatch-list, .variant-swatch-list, .block-swatch-list');
    lists.forEach(function(list){
      var items = list.querySelectorAll('.color-swatch__item, .variant-swatch__item, .block-swatch__item');
      items.forEach(function(item){
        var isSelected = item.classList.contains('is-selected');
        item.classList.toggle('variant-tiles__item--selected', isSelected);
        item.setAttribute('role', 'radio');
        item.setAttribute('tabindex', isSelected ? '0' : '-1');
        item.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        // Disabled state via wrapper classes
        var wrapper = item.closest('.color-swatch, .variant-swatch, .block-swatch');
        var isDisabled = wrapper && (wrapper.classList.contains('color-swatch--disabled') || wrapper.classList.contains('variant-swatch--disabled') || wrapper.classList.contains('block-swatch--disabled'));
        if (isDisabled) {
          item.setAttribute('aria-disabled', 'true');
        } else {
          item.removeAttribute('aria-disabled');
        }
      });
    });
  }

  function handleKeyboardActivation(e){
    var key = e.key || e.code;
    if (key !== 'Enter' && key !== 'Space' && key !== ' ' && key !== 'Spacebar') return;
    var target = e.target;
    if (!target || !target.matches('.variant-tiles__item, .color-swatch__item, .variant-swatch__item, .block-swatch__item')) return;
    if (target.getAttribute('aria-disabled') === 'true') return;
    var htmlFor = target.getAttribute('for');
    if (htmlFor) {
      var input = document.getElementById(htmlFor);
      if (input && !input.disabled) {
        input.click();
        e.preventDefault();
      }
    } else if (target.tagName === 'A' && target.href) {
      // Link items (product_url variant switch)
      target.click();
      e.preventDefault();
    }
  }

  document.addEventListener('keydown', handleKeyboardActivation);

  document.addEventListener('variant:changed', function(e){
    var form = e.target;
    if(!form) return;
    syncSelectedState(form);
  });

  document.addEventListener('product:rerender', function(e){
    var fragment = e.detail && e.detail.htmlFragment;
    if(fragment){
      syncSelectedState(fragment);
    }
    if(e.target) syncSelectedState(e.target);
  });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ syncSelectedState(document); });
  } else {
    syncSelectedState(document);
  }
})();
