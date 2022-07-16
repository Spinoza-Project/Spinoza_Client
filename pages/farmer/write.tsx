import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';

const WriteFeed = () => {
  const initialForm = {
    file: null,
    content: '',
  };
  const [form, setForm] = useState(initialForm);
  const [previewImage, setPreviewImage] = useState('');
  const router = useRouter();

  const encodeFileToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeImage(e);
    const fileBlob = e.target.files?.[0];
    if (!fileBlob) {
      setPreviewImage('');
    } else if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          resolve();
        };
      });
    }
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files?.[0],
    }));
  };
  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      query: { plantId },
    } = router;

    if (!form.content || !form.content.trim() || !form.file) {
      alert('사진과 "농장주의 한마디"를 넣어주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('content', form.content);

    axios
      .post(`/api/farmer/plant/${plantId}/feed`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        alert('피드가 업로드 되었습니다.');
        router.replace(`/farmer/plant/${plantId}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const goBack = () => {
    const { file, content } = form;
    if (file || content || content.trim()) {
      if (
        !confirm(
          '지금 돌아가면 작성한 내용이 사라집니다. 그래도 돌아가겠습니까?'
        )
      ) {
        return;
      }
    }
    router.back();
  };

  return (
    <Layout leftChild={<LogoHeader />}>
      <form onSubmit={onSubmit} className='flex flex-col gap-2 py-4'>
        <label className='cursor-pointer'>
          <div className='relative m-auto h-[300px] w-full max-w-[500px]'>
            {previewImage ? (
              <Image
                src={previewImage}
                alt='preview'
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            ) : (
              <div className='flex h-full flex-col items-center justify-center rounded-lg bg-gray-200'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p>사진을 추가해보세요!</p>
              </div>
            )}
          </div>
          <span className='sr-only'>Choose profile photo</span>
          <input
            type='file'
            accept='image/*'
            name='file'
            onChange={encodeFileToBase64}
            className='m-auto block w-full max-w-[500px] text-sm text-slate-500
          file:mr-4 file:rounded-lg file:border-0
        file:bg-primary file:py-2 file:px-4
          file:text-sm file:font-semibold file:text-white'
          />
        </label>
        <textarea
          name='content'
          value={form.content}
          onChange={onChangeTextArea}
          placeholder='"농장주의 한마디"를 적어주세요!'
          className='m-auto min-h-[200px] w-full max-w-[500px] resize-none rounded-lg'
        />
        <button className='m-auto w-full max-w-[500px] rounded-xl bg-primary px-8 py-3 text-lg text-white'>
          고객에게 피드 작성하기
        </button>
        <button
          type='button'
          onClick={goBack}
          className='m-auto w-full max-w-max px-2 underline'
        >
          돌아가기
        </button>
      </form>
    </Layout>
  );
};

export default WriteFeed;
