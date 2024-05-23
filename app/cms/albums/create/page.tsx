import CmsButton from '@/components/cms/CmsButton';
import CmsTextInput from '@/components/cms/CmsTextInput';
import prisma from '@/prisma/prisma';
import createId from '@/utils/id';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function CmsAlbumsCreatePage() {
  async function createArtist(formData: FormData) {
    'use server';

    await prisma.album.create({
      data: {
        colors: (formData.get('colors') as string).split(','),
        description: formData.get('description') as string,
        id: createId(6),
        release: new Date(formData.get('releaseDate') as string),
        title: formData.get('title') as string,
      },
    });

    redirect('/cms/albums');
  }

  return (
    <form action={createArtist} className="flex flex-col gap-32">
      <div className="flex w-[360px] flex-col gap-20">
        <div className="flex flex-col gap-8">
          <div className="text-18 font-700">Title</div>
          <CmsTextInput name="title" placeholder="..." required />
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-18 font-700">Description</div>
          <CmsTextInput name="description" placeholder="..." required />
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-18 font-700">Release</div>
          <CmsTextInput name="release" placeholder="..." required />
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-18 font-700">Colors</div>
          <CmsTextInput name="colors" placeholder="..." required />
        </div>
      </div>
      <div className="flex gap-12">
        <CmsButton type="submit" className="!bg-primary-500 !text-white">
          Save
        </CmsButton>
        <Link href={'/cms/albums'}>
          <CmsButton>Cancel</CmsButton>
        </Link>
      </div>
    </form>
  );
}
