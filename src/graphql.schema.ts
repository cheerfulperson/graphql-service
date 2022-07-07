
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AlbumInput {
    name?: Nullable<string>;
    released?: Nullable<number>;
    artistsIds?: Nullable<Nullable<string>[]>;
    bandsIds?: Nullable<Nullable<string>[]>;
    trackIds?: Nullable<Nullable<string>[]>;
    genresIds?: Nullable<Nullable<string>[]>;
    image?: Nullable<string>;
}

export class ArtistInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bandsIds?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export class MemberInput {
    _id: string;
    instruments?: Nullable<string>;
}

export class BandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<MemberInput>[]>;
    website?: Nullable<string>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export class FavouritesInput {
    id: string;
    userId?: Nullable<string>;
    bandsIds?: Nullable<Nullable<string>[]>;
    genresIds?: Nullable<Nullable<string>[]>;
    artistsIds?: Nullable<Nullable<string>[]>;
    tracksIds?: Nullable<Nullable<string>[]>;
}

export class GenreInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export class TrackInput {
    title: string;
    artistsIds?: Nullable<Nullable<string>[]>;
    bandsIds?: Nullable<Nullable<string>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export class UserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
    email: string;
    favouriteArtistIds?: Nullable<Nullable<string>[]>;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class Album {
    _id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    image?: Nullable<string>;
}

export class Albums {
    items?: Nullable<Nullable<Album>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export abstract class IQuery {
    abstract albums(limit?: Nullable<number>, offset?: Nullable<number>, name?: Nullable<string>): Nullable<Albums> | Promise<Nullable<Albums>>;

    abstract album(id: string): Nullable<Album> | Promise<Nullable<Album>>;

    abstract artists(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Artists> | Promise<Nullable<Artists>>;

    abstract artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract bands(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Bands> | Promise<Nullable<Bands>>;

    abstract band(id: string): Nullable<Band> | Promise<Nullable<Band>>;

    abstract favourites(limit?: Nullable<number>): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract genres(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Genres> | Promise<Nullable<Genres>>;

    abstract genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract tracks(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Tracks> | Promise<Nullable<Tracks>>;

    abstract track(id: string): Nullable<Track> | Promise<Nullable<Track>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract jwt(input: LoginUserInput): Nullable<Jwt> | Promise<Nullable<Jwt>>;
}

export abstract class IMutation {
    abstract createAlbum(input?: Nullable<AlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;

    abstract updateAlbum(id: string, input?: Nullable<AlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;

    abstract deleteAlbum(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createArtist(input?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract updateArtist(id: string, input?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract deleteArtist(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createBand(input?: Nullable<BandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract updateBand(id: string, input?: Nullable<BandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract deleteBand(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract addTrackToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addBandToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addArtistToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addGenreToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract removeTrackFromFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract removeBandFromFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract removeArtistFromFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract removeGenreFromFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract createGenre(input?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract updateGenre(id: string, input?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract deleteGenre(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createTrack(input?: Nullable<TrackInput>): Nullable<Track> | Promise<Nullable<Track>>;

    abstract updateTrack(id: string, input?: Nullable<TrackInput>): Nullable<Track> | Promise<Nullable<Track>>;

    abstract deleteTrack(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract register(input: UserInput): Nullable<User> | Promise<Nullable<User>>;
}

export class Artist {
    _id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export class Artists {
    items?: Nullable<Nullable<Artist>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export class Member {
    _id: string;
    instruments?: Nullable<string>;
}

export class Band {
    _id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<Member>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export class Bands {
    items?: Nullable<Nullable<Band>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export class Favourites {
    _id: string;
    userId?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    artists?: Nullable<Nullable<Artist>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
}

export class Genre {
    _id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export class Genres {
    items?: Nullable<Nullable<Genre>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export class Track {
    _id: string;
    title: string;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export class Tracks {
    items?: Nullable<Nullable<Track>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export class Jwt {
    jwt?: Nullable<string>;
}

export class User {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    email: string;
}

export class Verify {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    iat?: Nullable<number>;
}

type Nullable<T> = T | null;
