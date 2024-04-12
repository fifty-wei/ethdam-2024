import { setDeploymentProperty, DeploymentProperty } from '../../.deployment/deploymentManager'
import { task } from 'hardhat/config'
import { verifyAddress } from '../../utils/verifyAddress'
import dotenv from 'dotenv'
dotenv.config()

task('deploy', 'Deploy all contracts')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, network }) => {
    const { verify } = args
    console.log('Network:', network.name)

    const [deployer] = await ethers.getSigners()
    console.log('Using address: ', deployer.address)

    const balance = await ethers.provider.getBalance(deployer.address)
    console.log('Balance: ', ethers.utils.formatEther(balance))

    // Deploy Book
    const Book = await ethers.getContractFactory('Book')
    const bookArg: [] = []
    const book = await Book.deploy(...bookArg)

    await book.deployed()

    if (verify) {
      await verifyAddress(book.address, bookArg)
    }

    console.log('Deployed Book at', book.address)
    setDeploymentProperty(network.name, DeploymentProperty.Book, book.address)

    // Deploy Chapter
    const Chapter = await ethers.getContractFactory('Chapter')
    const chapterArg: [] = []
    const chapter = await Chapter.deploy(...chapterArg)

    await chapter.deployed()

    if (verify) {
      await verifyAddress(chapter.address, chapterArg)
    }

    console.log('Deployed Chapter at', chapter.address)
    setDeploymentProperty(network.name, DeploymentProperty.Chapter, chapter.address)
  })
