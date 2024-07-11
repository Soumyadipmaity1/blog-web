import React,{useState,useEffect,useContext} from 'react'
import image from '../../assets/images.jpg'
import "./Blog.css"
import {BsBookmarks,BsLink45Deg,BsFillBookmarksFill} from 'react-icons/bs';
import {AiFillTwitterCircle,AiFillInstagram,AiOutlineShareAlt,AiOutlineHeart,AiOutlineLike,AiFillLike} from 'react-icons/ai'
import {FcLike} from 'react-icons/fc'
import {VscComment} from 'react-icons/vsc'
import {MdOutlineBook,MdOutlineBookmark} from 'react-icons/md'
import {Link, useLocation,useParams} from 'react-router-dom'
import  {bookmark,unBookmark,likeBlog,unlikeBlog,getBlogById,getAllBlogs} from '../../apis/Blogs'
import {getUserById,loginUser} from '../../apis/Users'
import {LoginContext} from '../../contextProvider/context'
//import {useContext} from 'react'
import user, {RightSection} from "../Homepage/Home.jsx"
import Navbar from '../NavBar/Navbar'
import axios from 'axios'
import Share from '../AdditionalPages/Share';
import loadingAnimation from '../../assets/kOnzy.gif'

function PopularAuthors(props) {
    return (
        <>
            <div className='profile mb-5'>
                <img className='top-author' src={props.popularAuthorImg} alt=""/>
                <div className='author-info'>
                    <h4 className='authorName'>{props.popularAuthorName}</h4>
                    <h5 className='designation'>{props.popularAuthorDesignation}</h5>
                    <button className='follow-btn'>Follow</button>
                </div>
            </div>
        </>
    )
}

function Blog() {
    const {id} = useParams()
    const [blog,setBlog] = useState([])
    const [recentBlog,setRecentBlog] = useState([])

    const {loginData, setLoginData} = useContext(LoginContext)
    const [bookmark, setBookmark] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState([])
    const [loading, setLoading] = useState(false)
    const [showApp, setShowApp] = useState(false)
    const [showCopy, setShowCopy] = useState(false)

    let location = useLocation()

    const getRecent = async() => {
        const res = await getAllBlogs()
        setRecentBlog(res.data)
    }

    const getBlog = async() => {
        setLoading(true)
        const res = await getBlogById(id)
        let data = res.data.message
        setBlog(data)
        setLikes(data.likes)
        setLoading(false)
    }

    const bookmarkBlog = async() => {
        await bookmark(id, {userId: loginData._id})
        setBookmark(true)
    }

    const unbookmarkBlog = async() => {
        await unbookmarkBlog(id, {userId: loginData._id})
        setBookmark(false)
    }

    const like = async () => {
        await like(id,{userId: loginData._id})
        setLiked(true)
        getBlog()
    }

    const unlike = async () => {
        await like(id,{userId: loginData._id})
        setLiked(false)
        getBlog()
    }

    const shareToApps = () => {
        if(showApp === false) {
            setShowApp(true)
        }
        else {
            setShowApp(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
        setShowCopy(true)
        setTimeout(() => {
            setShowCopy(false)
        },2000);
    }

    useEffect(() => {
        getBlog()
        getRecent()
        loginData.bookmarks?.map((e) => {
            if(e === blog._id) {
                setBookmark(true)
            }
            else {
                setBookmark(false)
            }
        })
        blog.likes?.map((e) => {
            if(e === loginData._id) {
                setLiked(true)
            }
            else {
                setLiked(false)
            }
        })
    },[loginData])

    return (
        <>
        <Navbar/>
        <div style={{display:"loading" ? "block" : "none"}} className='loading-animation'>
            <div className='loading-div'>
                <img style={{width: "200px", height: "200px"}} src={loadingAnimation} alt=""/>
            </div>
        </div>
        <div style={{display: loading ? "none" : ""}} className='blog-container'>
            <section className='blog-section'>
                {
                    <>
                    <span className='category'>{blog.category}</span>
                    <div className='topBlogFlex'>
                        <div className='minor-info single-info'>

                            <a href={`/profile/${blog.authorid}`}>
                                <img className='author-image single-blog-author' src={blog.authorImage} alt=''/>
                            </a>

                            <div className='authorProfileInfo'>
                                <a href={`/profile/${blog.authorid}`}>
                                <p className='profile-author-name p1-1'>Shakir Farhan</p>
                                </a>
                            

                                <div className='profileMinorInfo'>
                                <div className='icons-flex'> &nbsp;
                                    <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 small-icons"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>
                                    </svg>
                                        &nbsp;

                                        <p className='publishdate'>&nbsp;{blog.readtime}&nbsp;</p></div>

                                        <div><span className='dot m-1'>.</span></div>
                                        <div className='icons-flex'>&nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        &nbsp;

                                        <p className='publishdate'>&nbsp;{blog.readtime}&nbsp;</p>
                                        </div>

                                        <div className='link-div'>
                                            <MdOutlineBookMarkAdd style={{display: bookmarkSet ? "none" : "block"}} onClick={() => bookmarkBlog()} className='bookmark-icon blog-icons'/>
                                            <MdOutlineBookmark style={{display: bookmarkSet ? "block" : "none"}} onClick={() => unbookmarkBlog()} className='bookmark-icon blog-icons'/>
                                            <BsLink45Deg onClick={copytoclipboard} className='link-icon blog-icons'/>
                                            <span style={{display: showCopy ? "block" : "none"}} className='copied'>Copied</span>
                                        </div>
                            </div>
                        </div>&nbsp;
                        </div>
                    </div>
                    <div className='single-blog-container'>
                        <h3 className='single-blog-title'>{blog.title}</h3>
                        <img className='single-blog-image' src={blog.image} alt="" />
                        <div className='description-area' dangerouslySetInnerHTML={{__html:blog.description}}>

                        </div>
                        <div className='appreciation'>
                            <div className='like-comment'>
                                <div>
                                    <AiOutlineLike style={{display: liked ? "none" : "block"}} onClick={like} className='appreciation-icon' />
                                    <AiFillLike style={{display: liked ? "block" : "none"}} onClick={unlike} className='appreciation-icon'/>
                                    <span>{likes.length}</span>
                                </div>
                                <div>
                                    <VsComment className='appreciation-icon' />
                                    <span>10</span>
                                </div>
                            </div>

                            <div className='link-bookmark'>
                                <div className='sharing-div'>
                                    <div style={{display: showApp ? "" : "none"}} className='share-apps'>
                                        <Share link={window.location.href}/>
                                    </div>
                                    <AiOutlineShareAlt onClick={shareToApps} style={{color: "black"}} className='link-icon' />
                                </div>
                                <MdOutlineBookAdd style={{display: bookmarkSet ? "none" : "block", marginTop: "2px"}} onClick= {() => bookmarkBlog()} className='bookmark-icon blog-icons mt-1'/>
                                <MdOutlineBookmark style={{display: bookmarkSet ? "block" : "none", marginTop: "2px"}} onClick={() => unbookmarkBlog()} className='bookmark-icon blog-icons'/>
                            </div>
                        </div>
                        <div className='end-dots mt-5'>
                            <div className='enddots'></div>
                            <div className='enddots'></div>
                            <div className='enddots'></div>
                            <div className='enddots'></div>
                        </div>
                    </div>
                    <div className='recent-blog-container'>
                        <h3 className='featured pt-4 mb-5'>
                            <span className='backgroundColor'>&nbsp;See Related&nbsp;</span>
                        </h3>
                        <div className='related-blogs'>
                            {
                                recentBlog.map((e,index) => {
                                    if(index < 10) {
                                        return (
                                            <>
                                                <a style={{textDecoration:"none"}} href={`/blog/${e._id}`}>
                                                    <div className='blog-card'>
                                                        <img className='recent-blog-img' src={e.image} alt=""/>
                                                        <div className='blogInfo'>
                                                            <span className='category'>{e.category}</span>
                                                            <h3 className='right-blog-title mt-2'>{e.title}</h3>
                                                            <div className='minor-info'>
                                                                <img className='author-image' src="" alt=""/>
                                                                <span className='publishDate'>&nbsp;Farhan</span>&nbsp;
                                                                <div className='icons-flex'>&nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/></svg>&nbsp;

                                                                <p className='publishdate'>{e.publishDate}</p>
                                                                </div>&nbsp;
                                                                <div className='icons-flex'>&nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>&nbsp;

                                                                    <p className='publishdate'>{e.readtime}</p>
                                                                </div>

                                                            </div>
                                                            <div className='intro right-intro' dangerouslySetInnerHTML={{__html: e.description.slice(0,200)}}>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </>
                                        )
                                    }
                                    return (
                                        <>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='comment-section'>

                    </div>
                    </>
                }
            </section>
            <RightSection/>
        </div>
        </>
    )
}

export default Blog