<script lang="ts">
  import { set_pdfjs_context } from '$lib/pdf-utils';

  set_pdfjs_context();
</script>

<slot />
