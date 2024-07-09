import useForm from '@/hooks/useForm';

import SearchBar from '@/components/SearchBar';

import s from './style.module.scss';

const LinkSearchArea = () => {
  const { formValues, handleChange, handleSubmit, resetForm } = useForm({ initialValues: { searchKeyword: '' }, callback: () => {} });

  return (
    <>
      <SearchBar />
      {formValues.value && (
        <div className={s.noteSearchKeyword}>
          <div>{formValues.value}</div>
          으로 검색한 결과입니다.
        </div>
      )}
    </>
  );
};

export default LinkSearchArea;
