// @ts-nocheck
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { patentSchema, type PatentSchema } from '$lib/schemas/zod-schema';
import { fail, type Actions } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import PatentInMemoryRepository from '$lib/repositories/patentsInMemory';
import ImageInMemoryRepository from '$lib/repositories/images';

// Dependencies
const imageInMemoryRepository = new ImageInMemoryRepository();
const patentRepository = new PatentInMemoryRepository(imageInMemoryRepository);

async function loadImage(id: string) {
  return patentRepository.getImageUrl(id);
}

async function loadData(id: string) {
  let patent = patentRepository.findById(id);
  if (id && !patent) return error(404, 'The patent does not exist');

  return await superValidate(patent, zod(patentSchema));
}

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  return {
    image: loadImage(params.id),
    form: await loadData(params.id)
  };
};

export const actions = {
  default: async (request: import('./$types').RequestEvent) => {
    const form = await superValidate(request, zod(patentSchema));
    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

    patentRepository.update(form.data.id, { ...form.data });

    return message(form, 'Patent saved successfully');
  }
};
;null as any as Actions;