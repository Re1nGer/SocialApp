const BackgroundProfileImageLoader = () => {
  return <div className='h-[400px]
           bg-gradient-to-r from-transparent via-rose-100/10 to-transparent
           -translate-x-full animate-[shimmer_2s_infinite]
           relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]
            before:bg-gradient-to-r
            before:from-transparent before:via-rose-100/10 before:to-transparent
            isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-rose-100/10'></div>;
};

export default BackgroundProfileImageLoader