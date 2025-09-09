(function(){
  function syncVariantPills(root){
    var groups = root.querySelectorAll('.variant-group');
    groups.forEach(function(group){
      var items = group.querySelectorAll('.variant-pill, .color-swatch__item, .variant-swatch__item, .block-swatch__item');
      items.forEach(function(item){
        var selected = item.classList.contains('is-selected');
        item.setAttribute('role', 'radio');
        item.setAttribute('aria-checked', selected ? 'true' : 'false');
        item.classList.add('variant-pill');
        var wrapper = item.closest('.color-swatch, .variant-swatch, .block-swatch');
        var disabled = wrapper && (wrapper.classList.contains('color-swatch--disabled') || wrapper.classList.contains('variant-swatch--disabled') || wrapper.classList.contains('block-swatch--disabled'));
        if (item.getAttribute('aria-disabled') === 'true') disabled = true;
        item.classList.toggle('is-disabled', !!disabled);
        if (disabled) item.setAttribute('aria-disabled', 'true'); else item.removeAttribute('aria-disabled');
      });
    });
  }

  document.addEventListener('variant:changed', function(e){ var scope = e.target || document; syncVariantPills(scope); });
  document.addEventListener('product:rerender', function(e){ var frag = e.detail && e.detail.htmlFragment; if (frag) syncVariantPills(frag); syncVariantPills(document); });
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', function(){ syncVariantPills(document); }); } else { syncVariantPills(document); }
})();
