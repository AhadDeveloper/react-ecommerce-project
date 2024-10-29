const useEmailKey = (email) => {
  const emailKey = email?.split("@")[0];

  return { emailKey };
};

export default useEmailKey;
