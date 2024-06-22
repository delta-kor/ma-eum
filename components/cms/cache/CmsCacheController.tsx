'use client';

export default function CmsCacheController() {
  async function handlePathPurge(formData: FormData) {
    const path = formData.get('path') as string;
    const type = (formData.get('type') as string) === 'on' ? 'layout' : 'page';
    if (!path) return false;

    const response = await fetch(`/api/cache/purge/path?path=${path}&type=${type}`);
    if (response.ok) alert('Purge success');
    else alert('Purge failed');
  }

  async function handleTagPurge(formData: FormData) {
    const tag = formData.get('tag') as string;
    if (!tag) return false;

    const response = await fetch(`/api/cache/purge/tag?tag=${tag}`);
    if (response.ok) alert('Purge success');
    else alert('Purge failed');
  }

  return (
    <div className="flex flex-col gap-16">
      <form action={handlePathPurge} className="flex items-center gap-12">
        <div className="w-64 text-16 font-700 text-black">Path</div>
        <input
          name="path"
          placeholder="path"
          type="text"
          className="rounded-4 bg-gray-100 px-12 py-8 text-14 text-black"
        />
        <input name="type" type="checkbox" className="size-16" />
        <button type="submit" className="rounded-4 bg-gray-100 px-12 py-8 text-14 text-black">
          Purge
        </button>
      </form>
      <form action={handleTagPurge} className="flex items-center gap-12">
        <div className="w-64 text-16 font-700 text-black">Tag</div>
        <input
          name="tag"
          placeholder="tag"
          type="text"
          className="rounded-4 bg-gray-100 px-12 py-8 text-14 text-black"
        />
        <div className="size-16" />
        <button type="submit" className="rounded-4 bg-gray-100 px-12 py-8 text-14 text-black">
          Purge
        </button>
      </form>
    </div>
  );
}
