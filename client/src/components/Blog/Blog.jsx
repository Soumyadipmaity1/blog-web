import React,{useState,useEffect,useContext} from 'react'
import image from '../../assets/images.jpg'
import "./Blog.css"

import {LoginContext} from '../../contextProvider/context'
//import {useContext} from 'react'
import user, {RightSection} from "../Homepage/Home.jsx"
import axios from 'axios'
import Share from '../AdditionalPages/Share';
import loadingAnimation from '../../assets/kOnzy.gif'
import { MdOutlineBook, MdOutlineBookmark, MdAdd } from 'react-icons/md'; 
import { BsLink45Deg } from 'react-icons/bs'; 
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from 'react-icons/ai'; 
import { VscComment } from 'react-icons/vsc'; 

import Navbar from '../NavBar/Navbar'
import { Link, useLocation, useParams } from 'react-router-dom';
import { bookmark, unBookmark, likeBlog, unlikeBlog, getBlogById, getAllBlogs } from '../../apis/Blogs';
import { getUserById, loginUser } from '../../apis/Users';

function PopularAuthors(props) {
  return (
    <>
      <div className='profile mb-5'>
        <img className='top-author' src={props.popularAuthorImg} alt='' />
        <div className='author-info'>
          <h4 className='authorName'>{props.popularAuthorName}</h4>
          <h5 className='designation'>{props.popularAuthorDesignation}</h5>
          <button className='follow-btn'>Follow</button>
        </div>
      </div>
    </>
  );
}

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [recentBlog, setRecentBlog] = useState([]);

  const { loginData, setLoginData } = useContext(LoginContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  let location = useLocation();

  const getRecent = async () => {
    const res = await getAllBlogs();
    setRecentBlog(res.data);
  };

  const getBlog = async () => {
    setLoading(true);
    const res = await getBlogById(id);
    let data = res.data.message;
    setBlog(data);
    setLikes(data.likes);
    setLoading(false);
  };

  const bookmarkBlog = async () => {
    await bookmark(id, { userId: loginData._id });
    setIsBookmarked(true);
  };

  const unbookmarkBlog = async () => {
    await unBookmark(id, { userId: loginData._id });
    setIsBookmarked(false);
  };

  const like = async () => {
    await likeBlog(id, { userId: loginData._id });
    setLiked(true);
    getBlog();
  };

  const unlike = async () => {
    await unlikeBlog(id, { userId: loginData._id });
    setLiked(false);
    getBlog();
  };

  const shareToApps = () => {
    setShowApp(!showApp);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopy(true);
    setTimeout(() => {
      setShowCopy(false);
    }, 2000);
  };

  useEffect(() => {
    getBlog();
    getRecent();
    loginData.bookmarks?.map((e) => {
      if (e === blog._id) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    });
    blog.likes?.map((e) => {
      if (e === loginData._id) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  }, [loginData]);

  return (
    <>
      <Navbar />
      <div
        style={{ display: loading ? 'block' : 'none' }}
        className='loading-animation'
      >
        <div className='loading-div'>
          <img style={{ width: '200px', height: '200px' }} src={loadingAnimation} alt='' />
        </div>
      </div>
      <div style={{ display: loading ? 'none' : '' }} className='blog-container'>
        <section className='blog-section'>
          <>
            <span className='category'>{blog.category}</span>
            <div className='topBlogFlex'>
              <div className='minor-info single-info'>
                <a href={`/profile/${blog.authorid}`}>
                  <img className='author-image single-blog-author' src={blog.authorImage} alt='' />
                </a>
                <div className='authorProfileInfo'>
                  <a href={`/profile/${blog.authorid}`}>
                    <p className='profile-author-name p1-1'>Shakir Farhan</p>
                  </a>
                  <div className='profileMinorInfo'>
                    <div className='icons-flex'>
                      &nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 small-icons'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                        />
                      </svg>
                      &nbsp;
                      <p className='publishdate'>&nbsp;{blog.readtime}&nbsp;</p>
                    </div>
                    <div>
                      <span className='dot m-1'>.</span>
                    </div>
                    <div className='icons-flex'>
                      &nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 small-icons'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      &nbsp;
                      <p className='publishdate'>&nbsp;{blog.readtime}&nbsp;</p>
                    </div>
                    <div className='link-div'>
                      <MdOutlineBookmark
                        style={{ display: isBookmarked ? 'none' : 'block' }}
                        onClick={bookmarkBlog}
                        className='bookmark-icon blog-icons'
                      />
                      <MdOutlineBookmark
                        style={{ display: isBookmarked ? 'block' : 'none' }}
                        onClick={unbookmarkBlog}
                        className='bookmark-icon blog-icons'
                      />
                      <BsLink45Deg onClick={copyToClipboard} className='link-icon blog-icons' />
                      <span style={{ display: showCopy ? 'block' : 'none' }} className='copied'>
                        Copied
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='single-blog-container'>
              <h3 className='single-blog-title'>{blog.title}</h3>
              <img className='single-blog-image' src={blog.image} alt='' />
              <div
                className='description-area'
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></div>
              <div className='category-links'>
                <Link to='/category'>Self-help</Link>
                <Link to='/category'>Health</Link>
                <Link to='/category'>Fitness</Link>
              </div>
            </div>
          </>
        </section>
        <RightSection recentBlog={recentBlog} />
        <Share />
      </div>
    </>
  );
}

export default Blog;

